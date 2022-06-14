import {BuildConfigRequest} from '../../model';
import {
  canisterId,
  canisterName,
  commitHash,
  dfxVersion,
  optimizeCount,
  ownerId,
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
    canisterName: data.canisterName,
    repoUrl: data.repoUrl,
    repoAccessToken: data.repoAccessToken,
    commitHash: data.commitHash,
    rustVersion: data.rustVersion,
    dfxVersion: data.dfxVersion,
    optimizeCount: data.optimizeCount,
    publicKey: data.publicKey,
    signature: data.signature,
    ownerId: data.ownerId,
    timestamp: data.timestamp
  });

const goodData1 = body({
  canisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  signature,
  ownerId,
  timestamp
});
const goodData2 = body({
  canisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  ownerId,
  timestamp
});
const goodData3 = body({
  canisterId,
  canisterName,
  repoUrl,
  repoAccessToken,
  commitHash,
  rustVersion: '',
  dfxVersion,
  optimizeCount: 0,
  publicKey,
  signature,
  ownerId,
  timestamp
});
export const goodData = [goodData1, goodData2, goodData3];

const badData1 = body({});
const badData2 = body({
  canisterId: 'bad canister'
});
const badData3 = body({
  canisterId
});
const badData4 = body({
  canisterId,
  canisterName
});
const badData5 = body({
  canisterId,
  canisterName,
  repoAccessToken
});
const badData6 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl: 'bad repo url'
});
const badData7 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl
});
const badData8 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash: 'bad commit hash'
});
const badData9 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash
});
const badData10 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: 'bad rust version'
});
const badData11 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion
});
const badData12 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion: 'bad dfx version'
});
const badData13 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion
});
const badData14 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount: -1
});
const badData15 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount
});
const badData16 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey: 'bad public key'
});
const badData17 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey
});
const badData18 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId: 'bad owner principal'
});
const badData19 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId
});
const badData20 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion: '',
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId
});
const badData21 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId,
  signature: 'bad signature'
});
const badData22 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId,
  signature
});
const badData23 = body({
  canisterId,
  canisterName,
  repoAccessToken,
  repoUrl,
  commitHash,
  rustVersion,
  dfxVersion,
  optimizeCount,
  publicKey,
  ownerId,
  signature,
  timestamp: 1649274029457 + 300001
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
  badData23
];
