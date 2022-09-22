import {BuildConfigRequest} from '../../model';
import {
  callerId,
  canisterId,
  canisterName,
  commitHash,
  delegateCanisterId,
  dfxVersion,
  optimizeCount,
  publicKey,
  repoAccessToken,
  repoUrl,
  rustVersion,
  signature,
  timestamp
} from './dump';

const body = (data: BuildConfigRequest): string =>
  JSON.stringify({
    canisterId: data.canisterId,
    delegateCanisterId: data.delegateCanisterId,
    canisterName: data.canisterName,
    repoUrl: data.repoUrl,
    repoAccessToken: data.repoAccessToken,
    commitHash: data.commitHash,
    rustVersion: data.rustVersion,
    dfxVersion: data.dfxVersion,
    optimizeCount: data.optimizeCount,
    publicKey: data.publicKey,
    signature: data.signature,
    callerId: data.callerId,
    timestamp: data.timestamp
  });

const goodData1 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  signature,
  callerId,
  timestamp
});
const goodData2 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  callerId,
  timestamp
});
const goodData3 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion: '',
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  callerId,
  timestamp
});
const goodData4 = body({
  canisterId,
  delegateCanisterId: '',
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  signature,
  callerId,
  timestamp
});
const goodData5 = body({
  canisterId,
  delegateCanisterId: '',
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  callerId,
  timestamp
});
const goodData6 = body({
  canisterId,
  delegateCanisterId: '',
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion: '',
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  callerId,
  timestamp
});
export const goodData = [goodData1, goodData2, goodData3, goodData4, goodData5, goodData6];

const badData1 = body({});
const badData2 = body({
  canisterId: 'bad canister'
});
const badData3 = body({
  canisterId
});
const badData4 = body({
  canisterId,
  delegateCanisterId: 'bad delegateCanisterId'
});
const badData5 = body({
  canisterId,
  delegateCanisterId
});
const badData6 = body({
  canisterId,
  delegateCanisterId,
  canisterName
});
const badData7 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken
});
const badData8 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl: 'bad repo url'
});
const badData9 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl
});
const badData10 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash: 'bad commit hash'
});
const badData11 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash
});
const badData12 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: 'bad rust version'
});
const badData13 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion
});
const badData14 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion: 'bad dfx version'
});
const badData15 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion
});
const badData16 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: -1
});
const badData17 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount
});
const badData18 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey: 'bad public key'
});
const badData19 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey
});
const badData20 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  callerId: 'bad caller principal'
});
const badData21 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  callerId
});
const badData22 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: '',
  dfxVersion,
  optimizeCount,
  publicKey,
  callerId
});
const badData23 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  callerId,
  signature: 'bad signature'
});
const badData24 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  callerId,
  signature
});
const badData25 = body({
  canisterId,
  delegateCanisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  callerId,
  signature:
    'f49f23f076ba550f70e1080066a47ea961f97941e3691ac0233b2e69c8715312ff2645ec019981afcf52a57ab3c301625475c382849db93b06006e4b3d11e400',
  timestamp: timestamp - 300001
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
  badData10,
  badData11,
  badData12,
  badData13,
  badData14,
  badData15,
  badData16,
  badData17,
  badData18,
  badData19,
  badData20,
  badData21,
  badData22,
  badData23,
  badData24,
  badData25
];
