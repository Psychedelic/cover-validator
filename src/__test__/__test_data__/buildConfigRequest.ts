import {BuildWasmRequest} from "../../model";

const canisterId = "bymdn-oaaaa-aaaai-abeva-cai";
const publicKey = "ee68ea737af7dc455b4b4150e420bc403ab4561e1e818756071cb84622d8dd0e";
const userPrincipal = "nqc3c-dlaut-vo2wp-yjr4u-ujegb-pnige-n65cs-4fv34-vt37w-ctkbw-gqe";

const body = (body: BuildWasmRequest): string =>
  JSON.stringify({
    canisterId: body.canisterId,
    repoAccessToken: process.env.REPO_ACCESS_TOKEN,
    publicKey: body.publicKey,
    signature: process.env.SIGNATURE,
    userPrincipal: body.userPrincipal
  });

export const goodData = body({
  canisterId,
  publicKey,
  userPrincipal
});

const badData1 = body({});
const badData2 = body({
  canisterId: "bad canister"
});
const badData3 = body({
  canisterId,
  publicKey: "bad public key"
});
const badData4 = body({
  userPrincipal: "bad user principal"
});

export const badData = [badData1, badData2, badData3, badData4];
