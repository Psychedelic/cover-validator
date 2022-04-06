import {BuildWithConfigRequest} from "../../model";
import {canisterId, ownerId, publicKey, repoAccessToken, signature, timestamp} from "./dump";

const body = (body: BuildWithConfigRequest): string =>
  JSON.stringify({
    canisterId: body.canisterId,
    ownerId: body.ownerId,
    repoAccessToken: body.repoAccessToken,
    publicKey: body.publicKey,
    signature: body.signature,
    timestamp: body.timestamp
  });

export const goodData = body({
  canisterId,
  ownerId,
  repoAccessToken,
  publicKey,
  signature,
  timestamp
});

const badData1 = body({});
const badData2 = body({
  canisterId: "bad canister"
});
const badData3 = body({
  canisterId
});
const badData4 = body({
  canisterId,
  ownerId: "bad owner principal"
});
const badData5 = body({
  canisterId,
  ownerId,
  repoAccessToken
});
const badData6 = body({
  canisterId,
  ownerId,
  repoAccessToken,
  publicKey: "bad public key"
});
const badData7 = body({
  canisterId,
  ownerId,
  repoAccessToken,
  publicKey
});
const badData8 = body({
  canisterId,
  ownerId,
  repoAccessToken,
  publicKey,
  signature: "bad signature"
});
const badData9 = body({
  canisterId,
  ownerId,
  repoAccessToken,
  publicKey,
  signature,
  timestamp: 1649274029457 + 300001
});

export const badData = [badData1, badData2, badData3, badData4, badData5, badData6, badData7, badData8, badData9];
