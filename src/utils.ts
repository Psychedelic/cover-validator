import {
  BadInputRequest,
  GettingCanisterInfoFailed,
  InvalidOwner,
  InvalidRepoPermission,
  InvalidSignature,
  UnauthorizedOwner,
  ValidateRepoFail
} from "./error";
import {Certificate, HttpAgent} from "@dfinity/agent";
import {ClassType, transformAndValidate} from "class-transformer-validator";
import {Ed25519PublicKey, Secp256k1PublicKey} from "@dfinity/identity";
import {Decoder} from "cbor";
import {Octokit} from "@octokit/core";
import {Principal} from "@dfinity/principal";
import fetch from "isomorphic-fetch";
import secp256k1 from "secp256k1";
import {sha256} from "js-sha256";
import tweetnacl from "tweetnacl";

export const validateRepo = async (url: string, token: string) => {
  const urlSplit = url.split("/");

  const octokit = new Octokit({
    auth: token
  });

  let res;
  try {
    res = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: urlSplit[0],
      repo: urlSplit[1]
    });
  } catch (error) {
    console.error("Validate repo fail: ", error);
    throw ValidateRepoFail;
  }

  if (!res.data.permissions?.triage) {
    throw InvalidRepoPermission;
  }
};

export const validateCanister = async (canisterId: string, ownerId: string) => {
  const agent = new HttpAgent({host: "https://ic0.app", fetch});

  const canisterPrincipal = Principal.fromText(canisterId);

  const path = [Buffer.from("canister", "utf8"), canisterPrincipal.toUint8Array(), Buffer.from("controllers", "utf8")];

  let cert;
  try {
    const res = await agent.readState(canisterPrincipal, {
      paths: [path]
    });

    cert = new Certificate(res, agent);
    await cert.verify();
  } catch (error) {
    console.error("Validate canister owner fail: ", error);
    throw GettingCanisterInfoFailed;
  }

  const resEnc = cert.lookup(path);

  const controllers: string[] = Decoder.decodeFirstSync(resEnc as ArrayBuffer).value.map((x: Uint8Array) =>
    Principal.fromUint8Array(x).toText()
  );

  if (!controllers.includes(ownerId)) {
    throw UnauthorizedOwner;
  }
};

const validateSecp256k1Signature = (canisterId: string, signature: string, publicKey: string): boolean => {
  const challenge = Buffer.from(canisterId, "utf8");
  const hash = sha256.create();
  hash.update(challenge);
  try {
    return secp256k1.ecdsaVerify(
      Buffer.from(signature, "hex"),
      new Uint8Array(hash.digest()),
      Buffer.from(publicKey, "hex")
    );
  } catch (_) {
    return false;
  }
};

const validateEd25519Signature = (canisterId: string, signature: string, publicKey: string): boolean => {
  try {
    return tweetnacl.sign.detached.verify(
      Buffer.from(canisterId, "utf8"),
      Buffer.from(signature, "hex"),
      Buffer.from(publicKey, "hex")
    );
  } catch (_) {
    return false;
  }
};

export const validateSignature = (canisterId: string, signature: string, publicKey: string) => {
  const validSecp256k1Signature = validateSecp256k1Signature(canisterId, signature, publicKey);
  const validEd25519Signature = validateEd25519Signature(canisterId, signature, publicKey);
  if (!validSecp256k1Signature && !validEd25519Signature) {
    throw InvalidSignature;
  }
};

export const validatePrincipal = (ownerId: string, publicKey: string) => {
  const ed25519PublicKey = Ed25519PublicKey.fromRaw(Buffer.from(publicKey, "hex"));
  const secp256k1PublicKey = Secp256k1PublicKey.fromRaw(Buffer.from(publicKey, "hex"));

  const ed25519Principal = Principal.selfAuthenticating(new Uint8Array(ed25519PublicKey.toDer()));
  const secp256k1Principal = Principal.selfAuthenticating(new Uint8Array(secp256k1PublicKey.toDer()));

  if (ed25519Principal.toText() !== ownerId && secp256k1Principal.toText() !== ownerId) {
    throw InvalidOwner;
  }
};

export const transformAndValidateData = async <T extends object>(
  event: string,
  classType: ClassType<T>
): Promise<T> => {
  try {
    return (await transformAndValidate(classType, event)) as T;
  } catch (error) {
    throw BadInputRequest(error);
  }
};
