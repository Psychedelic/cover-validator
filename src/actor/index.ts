import {Actor, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {_SERVICE as Service} from "./factory.d";
import {config} from "../config";
import fetch from "isomorphic-fetch";
import {idlFactory} from "./factory";

const createActor = async (): Promise<ActorSubclass<Service>> => {
  const agent = new HttpAgent({host: config.icHost, fetch, identity: config.identity});

  const actor = Actor.createActor<Service>(idlFactory, {
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

  return actor;
};

let coverActor: ActorSubclass<Service>;

export const getCoverActor = async (): Promise<ActorSubclass<Service>> => {
  if (!coverActor) {
    coverActor = await createActor();
  }

  return coverActor;
};
