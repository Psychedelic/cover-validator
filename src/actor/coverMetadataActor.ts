import {Actor, HttpAgent} from '@dfinity/agent';
import fetch from 'isomorphic-fetch';

import {config} from '../config';
import {idlFactory} from './coverMetadataFactory';
import {_SERVICE as Service} from './coverMetadataFactory.d';

const agent = new HttpAgent({host: config.icHost, fetch, identity: config.identity});

export const getCoverMetadataActor = (canisterId: string) =>
  Actor.createActor<Service>(idlFactory, {
    canisterId,
    agent
  });
