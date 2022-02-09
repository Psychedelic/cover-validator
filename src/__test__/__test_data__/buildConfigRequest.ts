if (!process.env.SIGNATURE) throw new Error("Couldn't load signature");
if (!process.env.REPO_ACCESS_TOKEN) throw new Error("Couldn't load repo access token");

import {BuildConfigRequest} from "../../model";

const canisterId = "bymdn-oaaaa-aaaai-abeva-cai";
const canisterName = "motoko";
const repoUrl = "claire-tran/motoko";
const commitHash = "b2d85d4fc583289261227963f7dd6b3cc3864360";
const rustVersion = "1.57.0";
const dfxVersion = "0.8.4";
const optimizeCount = 1;
const publicKey = "ee68ea737af7dc455b4b4150e420bc403ab4561e1e818756071cb84622d8dd0e";
const userPrincipal = "nqc3c-dlaut-vo2wp-yjr4u-ujegb-pnige-n65cs-4fv34-vt37w-ctkbw-gqe";

const body = (body: BuildConfigRequest): string =>
  JSON.stringify({
    canisterId: body.canisterId,
    canisterName: body.canisterName,
    repoUrl: body.repoUrl,
    repoAccessToken: process.env.REPO_ACCESS_TOKEN,
    commitHash: body.commitHash,
    rustVersion: body.rustVersion,
    dfxVersion: body.dfxVersion,
    optimizeCount: body.optimizeCount,
    publicKey: body.publicKey,
    signature: process.env.SIGNATURE,
    userPrincipal: body.userPrincipal
  });

export const goodData = body({
  canisterId,
  canisterName,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  userPrincipal
});

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
