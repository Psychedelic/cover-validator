import {
  canisterId,
  canisterName,
  commitHash,
  dfxVersion,
  optimizeCount,
  publicKey,
  repoAccessToken,
  repoUrl,
  rustVersion,
  signature,
  userPrincipal
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
    userPrincipal: body.userPrincipal
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
  userPrincipal
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
  userPrincipal
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
  userPrincipal
});
export const goodData = [goodData1, goodData2, goodData3];

const badData1 = body({});
const badData2 = body({
  canisterId: "bad canister"
});
const badData3 = body({
  canisterId,
  repoUrl: "bad repo url"
});
const badData4 = body({
  canisterId,
  repoUrl,
  commitHash: "bad commit hash"
});
const badData5 = body({
  canisterId,
  repoUrl,
  commitHash,
  rustVersion: "bad rust version"
});
const badData6 = body({
  canisterId,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion: "bad dfx version"
});
const badData7 = body({
  canisterId,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: -1
});
const badData8 = body({
  canisterId,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey: "bad public key"
});
const badData9 = body({
  canisterId,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  userPrincipal: "bad user principal"
});
const badData10 = body({
  canisterId,
  canisterName,
  repoUrl,
  commitHash,
  rustVersion: "",
  dfxVersion,
  optimizeCount: 1,
  publicKey,
  userPrincipal
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
  badData10
];
