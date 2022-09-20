import {Certificate, HttpAgent} from '@dfinity/agent';
import {Ed25519PublicKey, Secp256k1PublicKey} from '@dfinity/identity';
import {Principal} from '@dfinity/principal';
import {Octokit} from '@octokit/core';
import {Decoder} from 'cbor';
import {ClassType, transformAndValidate} from 'class-transformer-validator';
import fetch from 'isomorphic-fetch';
import {sha256} from 'js-sha256';
import secp256k1 from 'secp256k1';
import tweetnacl from 'tweetnacl';

import {getCoverMetadataActor} from './actor/coverMetadataActor';
import {CoverMetadata} from './actor/coverMetadataFactory.d';
import {
  GetCanisterInfoFailed,
  GetCoverMetadataFailed,
  InvalidOwner,
  InvalidSignature,
  InvalidTimestamp,
  throwBadInputRequest,
  UnauthorizedOwner,
  ValidateRepoFail
} from './error';
import {CoverMetadataValidator} from './model';
import {getTime} from './timeUtils';

// Validate and return repo visibility
export const validateRepo = async (url: string, token: string): Promise<string> => {
  const urlSplit = url.split('/');

  const octokit = new Octokit({
    auth: token
  });

  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: urlSplit[0],
      repo: urlSplit[1]
    });
    return res.data.visibility as string;
  } catch (error) {
    console.error('Validate repo fail: ', error);
    throw ValidateRepoFail;
  }
};

export const getCanisterControllers = async (canisterId: string): Promise<string[]> => {
  const agent = new HttpAgent({host: 'https://ic0.app', fetch});

  const canisterPrincipal = Principal.fromText(canisterId);

  const path = [Buffer.from('canister', 'utf8'), canisterPrincipal.toUint8Array(), Buffer.from('controllers', 'utf8')];

  let cert: Certificate;
  try {
    const {certificate} = await agent.readState(canisterPrincipal, {
      paths: [path]
    });

    cert = await Certificate.create({certificate, rootKey: agent.rootKey, canisterId: canisterPrincipal});
  } catch (error) {
    console.error('Validate canister owner fail: ', error);
    throw GetCanisterInfoFailed;
  }

  const resEnc = cert.lookup(path);

  const controllers: string[] = Decoder.decodeFirstSync(resEnc as ArrayBuffer).value.map((x: Uint8Array) =>
    Principal.fromUint8Array(x).toText()
  );

  return controllers;
};

export const validateCanister = async (canisterId: string, ownerId: string) => {
  const controllers = await getCanisterControllers(canisterId);
  if (!controllers.includes(ownerId)) {
    throw UnauthorizedOwner;
  }
};

const validateSecp256k1Signature = (timestamp: number, signature: string, publicKey: string): boolean => {
  const challenge = Buffer.from(timestamp.toString(), 'utf8');
  const hash = sha256.create();
  hash.update(challenge);
  try {
    return secp256k1.ecdsaVerify(
      Buffer.from(signature, 'hex'),
      new Uint8Array(hash.digest()),
      Buffer.from(publicKey, 'hex')
    );
  } catch (_) {
    return false;
  }
};

const validateEd25519Signature = (timestamp: number, signature: string, publicKey: string): boolean => {
  try {
    return tweetnacl.sign.detached.verify(
      Buffer.from(timestamp.toString(), 'utf8'),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    );
  } catch (_) {
    return false;
  }
};

export const validateSignature = (timestamp: number, signature: string, publicKey: string) => {
  const validSecp256k1Signature = validateSecp256k1Signature(timestamp, signature, publicKey);
  const validEd25519Signature = validateEd25519Signature(timestamp, signature, publicKey);
  if (!validSecp256k1Signature && !validEd25519Signature) {
    throw InvalidSignature;
  }
};

export const validatePrincipal = (ownerId: string, publicKey: string) => {
  const ed25519PublicKey = Ed25519PublicKey.fromRaw(Buffer.from(publicKey, 'hex'));
  const secp256k1PublicKey = Secp256k1PublicKey.fromRaw(Buffer.from(publicKey, 'hex'));

  const ed25519Principal = Principal.selfAuthenticating(new Uint8Array(ed25519PublicKey.toDer()));
  const secp256k1Principal = Principal.selfAuthenticating(new Uint8Array(secp256k1PublicKey.toDer()));

  if (ed25519Principal.toText() !== ownerId && secp256k1Principal.toText() !== ownerId) {
    throw InvalidOwner;
  }
};

export const transformAndValidateData = async <T extends object>(
  event: string | object,
  classType: ClassType<T>
): Promise<T> => {
  try {
    if (typeof event === 'string') {
      return (await transformAndValidate(classType, event)) as T;
    }
    return (await transformAndValidate(classType, event)) as T;
  } catch (error) {
    throw throwBadInputRequest(error);
  }
};

export const getCoverMetadataValidated = async (canisterId: string): Promise<CoverMetadata> => {
  let coverMetadata: CoverMetadata;
  try {
    const actor = getCoverMetadataActor(canisterId);
    coverMetadata = await actor.coverMetadata();
  } catch (_) {
    throw GetCoverMetadataFailed;
  }
  await transformAndValidateData<CoverMetadataValidator>(coverMetadata, CoverMetadataValidator);
  return coverMetadata;
};

export const validateTimestamp = (timestamp: number) => {
  const millisecondsDifferent = getTime() - timestamp;

  // Need to be less than 5 minutes
  if (millisecondsDifferent > 300000 || millisecondsDifferent < 0) {
    throw InvalidTimestamp;
  }
};
