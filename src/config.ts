import {Ed25519KeyIdentity} from "@dfinity/identity";

interface Config {
  coverCanisterId: string;
  icHost: string;
  nodeEnv: string;
  identity: Ed25519KeyIdentity;
  coverToken: string;
}

const identity = Ed25519KeyIdentity.generate();

let coverToken: string;
if (process.env.COVER_TOKEN) {
  coverToken = process.env.COVER_TOKEN;
} else {
  throw new Error("Couldn't load cover token");
}

let coverCanisterId: string;
if (process.env.COVER_CANISTER_ID) {
  coverCanisterId = process.env.COVER_CANISTER_ID;
} else {
  throw new Error("Couldn't load canister Id");
}

const nodeEnv = process.env.NODE_ENV || "local";

const icHost = nodeEnv === "local" ? "http://host.docker.internal:8000" : "https://ic0.app";

export const config: Config = {coverCanisterId, icHost, nodeEnv, identity, coverToken};
