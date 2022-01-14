import {
  BadInputRequest,
  GettingCanisterInfoFailed,
  InvalidRepoPermission,
  InvalidSignature,
  UnauthorizedPrincipal,
  ValidateRepoFail
} from "./error";
import {Certificate, HttpAgent} from "@dfinity/agent";
import {ClassType, transformAndValidate} from "class-transformer-validator";
import {Octokit} from "@octokit/core";
import {Principal} from "@dfinity/principal";
import {decode} from "cbor";
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
    console.log("Validate repo fail: ", error);
    throw ValidateRepoFail;
  }

  if (!res.data.permissions?.triage) {
    throw InvalidRepoPermission;
  }
};

//
export const validateCanister = async (canisterId: string, userPrincipal: string) => {
  const agent = new HttpAgent({host: "https://ic0.app", fetch});
  const canisterPrincipal = Principal.fromText(canisterId);

  const path = [Buffer.from("canister", "utf8"), canisterPrincipal.toUint8Array(), Buffer.from("controllers", "utf8")];

  let res;
  let cert;
  try {
    res = await agent.readState(canisterPrincipal, {
      paths: [path]
    });

    cert = new Certificate(res, agent);
    await cert.verify();
  } catch (error) {
    console.log("Validate canister owner fail: ", error);
    throw GettingCanisterInfoFailed;
  }

  const resEnc = (cert as Certificate).lookup(path);
  const controllers: string[] = decode(resEnc as ArrayBuffer).value.map((x: Uint8Array) =>
    Principal.fromUint8Array(x).toText()
  );

  if (!controllers.includes(userPrincipal)) {
    throw UnauthorizedPrincipal;
  }
};

export const fromHexString = (hex: string): Uint8Array =>
  new Uint8Array((hex.match(/.{1,2}/g) ?? []).map(byte => parseInt(byte, 16)));

const validateSecp256k1Signature = (canisterId: string, signature: string, publicKey: string): boolean => {
  const challenge = Buffer.from(canisterId, "utf8");
  const hash = sha256.create();
  hash.update(challenge);

  try {
    return secp256k1.ecdsaVerify(fromHexString(signature), new Uint8Array(hash.digest()), fromHexString(publicKey));
  } catch (error) {
    console.log("Can't validate Secp256k1 signature: ", error);
    return false;
  }
};

const validateEd25519Signature = (canisterId: string, signature: string, publicKey: string): boolean => {
  try {
    return tweetnacl.sign.detached.verify(
      Buffer.from(canisterId, "utf8"),
      fromHexString(signature),
      fromHexString(publicKey)
    );
  } catch (error) {
    console.log("Can't validate Ed25519 signature: ", error);
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
