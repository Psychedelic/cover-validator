import {Actor, HttpAgent} from '@dfinity/agent';
import fetch from 'isomorphic-fetch';

import {config} from '../config';
import {idlFactory} from './idl/cover.did';
import {_SERVICE as Service} from './idl/cover.did.d';

const agent = new HttpAgent({host: config.icHost, fetch, identity: config.identity});

export const coverActor = Actor.createActor<Service>(idlFactory, {
  canisterId: config.coverCanisterId,
  agent
});

// Fetch root key for certificate validation during development
if (config.nodeEnv === 'local') {
  await agent.fetchRootKey().catch(err => {
    console.error('Unable to fetch root key. Check to ensure that your local replica is running');
    throw err;
  });
}
