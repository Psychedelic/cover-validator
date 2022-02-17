import {canisterId, ownerId, publicKey, repoAccessToken, signature} from "./dump";
import {BuildWithConfigRequest} from "../../model";

const body = (body: BuildWithConfigRequest): string =>
  JSON.stringify({
    canisterId: body.canisterId,
    ownerId: body.ownerId,
    repoAccessToken: body.repoAccessToken,
    publicKey: body.publicKey,
    signature: body.signature
  });

export const goodData = body({
  canisterId,
  ownerId,
  repoAccessToken,
  publicKey,
  signature
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

export const badData = [badData1, badData2, badData3, badData4, badData5, badData6, badData7, badData8];
