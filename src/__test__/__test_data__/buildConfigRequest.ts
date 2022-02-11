import {
  canisterId,
  canisterName,
  commitHash,
  dfxVersion,
  optimizeCount,
  ownerId,
  publicKey,
  repoAccessToken,
  repoUrl,
  rustVersion,
  signature
} from "./dump";
import {BuildConfigRequest} from "../../model";

const body = (body: BuildConfigRequest): string =>
  JSON.stringify({
    canisterId: body.canisterId,
    canisterName: body.canisterName,
    repoUrl: body.repoUrl,
    repoAccessToken: body.repoAccessToken,
    commitHash: body.commitHash,
    rustVersion: body.rustVersion,
    dfxVersion: body.dfxVersion,
    optimizeCount: body.optimizeCount,
    publicKey: body.publicKey,
    signature: body.signature,
    ownerId: body.ownerId
  });

const goodData1 = body({
  canisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  signature,
  ownerId
});
const goodData2 = body({
  canisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  ownerId
});
const goodData3 = body({
  canisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  ownerId
});
export const goodData = [goodData1, goodData2, goodData3];

const badData1 = body({});
const badData2 = body({
  canisterId: "bad canister"
});
const badData3 = body({
  canisterId
});
const badData4 = body({
  canisterId,
  canisterName
});
const badData5 = body({
  canisterId,
  canisterName,
  repoAccessToken
});
const badData6 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl: "bad repo url"
});
const badData7 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl
});
const badData8 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash: "bad commit hash"
});
const badData9 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash
});
const badData10 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: "bad rust version"
});
const badData11 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion
});
const badData12 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion: "bad dfx version"
});
const badData13 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion
});
const badData14 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: -1
});
const badData15 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount
});
const badData16 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey: "bad public key"
});
const badData17 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey
});
const badData18 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId: "bad owner principal"
});
const badData19 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId
});
const badData20 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: "",
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId
});
const badData21 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: "",
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId,
  signature: "bad signature"
});
export const badData = [
  badData1,
  badData2,
  badData3,
  badData4,
  badData5,
  badData6,
  badData7,
  badData8,
  badData9,
  badData10,
  badData11,
  badData12,
  badData13,
  badData14,
  badData15,
  badData16,
  badData17,
  badData18,
  badData19,
  badData20,
  badData21
];
