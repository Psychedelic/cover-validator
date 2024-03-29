import {BuildWithConfigRequest} from '../../model';
import {callerId, canisterId, publicKey, repoAccessToken, signature, timestamp} from './dump';

const body = (data: BuildWithConfigRequest): string =>
  JSON.stringify({
    canisterId: data.canisterId,
    callerId: data.callerId,
    repoAccessToken: data.repoAccessToken,
    publicKey: data.publicKey,
    signature: data.signature,
    timestamp: data.timestamp
  });

export const goodData = body({
  canisterId,
  callerId,
  repoAccessToken,
  publicKey,
  signature,
  timestamp
});

const badData1 = body({});
const badData2 = body({
  canisterId: 'bad canister'
});
const badData3 = body({
  canisterId
});
const badData4 = body({
  canisterId,
  callerId: 'bad caller principal'
});
const badData5 = body({
  canisterId,
  callerId,
  repoAccessToken
});
const badData6 = body({
  canisterId,
  callerId,
  repoAccessToken,
  publicKey: 'bad public key'
});
const badData7 = body({
  canisterId,
  callerId,
  repoAccessToken,
  publicKey
});
const badData8 = body({
  canisterId,
  callerId,
  repoAccessToken,
  publicKey,
  signature: 'bad signature'
});
const badData9 = body({
  canisterId,
  callerId,
  repoAccessToken,
  publicKey,
  signature:
    'f49f23f076ba550f70e1080066a47ea961f97941e3691ac0233b2e69c8715312ff2645ec019981afcf52a57ab3c301625475c382849db93b06006e4b3d11e400',
  timestamp: timestamp - 300001
});

export const badData = [badData1, badData2, badData3, badData4, badData5, badData6, badData7, badData8, badData9];
