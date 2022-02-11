import {canisterId, ownerId} from "./dump";
import {BuildWithConfigRequest} from "../../model";

const body = (body: BuildWithConfigRequest): string =>
  JSON.stringify({
    canisterId: body.canisterId,
    ownerId: body.ownerId
  });

export const goodData = body({
  canisterId,
  ownerId
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

export const badData = [badData1, badData2, badData3, badData4];
