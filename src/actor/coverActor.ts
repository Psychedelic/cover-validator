import {Actor, HttpAgent} from "@dfinity/agent";
import {_SERVICE as Service} from "./factory.d";
import {config} from "../config";
import fetch from "isomorphic-fetch";
import {idlFactory} from "./factory";

const agent = new HttpAgent({host: config.icHost, fetch, identity: config.identity});

const coverActor = Actor.createActor<Service>(idlFactory, {
  canisterId: config.coverCanisterId,
  agent
});

// Fetch root key for certificate validation during development
if (config.nodeEnv === "local") {
  await agent.fetchRootKey().catch(err => {
    console.error("Unable to fetch root key. Check to ensure that your local replica is running");
    throw err;
  });
}

export {coverActor};
