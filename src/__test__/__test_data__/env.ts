import {Principal} from '@dfinity/principal';
import {Decoder} from 'cbor';
import MockDate from 'mockdate';
import * as td from 'testdouble';

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

//  MOCK - cbor
td.replace(Decoder, 'decodeFirstSync', () => ({
  value: [Principal.fromText(callerId).toUint8Array(), Principal.fromText(delegateCanisterId).toUint8Array()]
}));

// MOCK - cover canister id
process.env.COVER_CANISTER_ID = 'fakeCoverCanisterId';

// MOCK - aws secrets manager
const {SecretsManagerClient} = td.replace('@aws-sdk/client-secrets-manager', {
  SecretsManagerClient: td.func(),
  GetSecretValueCommand: td.func()
});
td.when(new SecretsManagerClient(td.matchers.anything())).thenReturn({
  send: () => ({
    SecretString:
      '{"coverGithubToken":"fakeCoverGithubToken","coverValidatorPrivateKey":"fakeCoverValidatorPrivateKey"}'
  })
});

// MOCK - @dfinity agent
const {HttpAgent} = td.replace('@dfinity/agent', {
  Actor: {
    createActor: () => ({
      registerVerification: () => ({
        Ok: null
      }),
      saveBuildConfig: () => {
        // Do nothing.
      },
      getBuildConfigValidator: () => [
        {
          caller_id: Principal.fromText(callerId),
          delegate_canister_id: [Principal.fromText(delegateCanisterId)],
          canister_id: Principal.fromText(canisterId),
          canister_name: canisterName,
          repo_url: repoUrl,
          repo_access_token: repoAccessToken,
          commit_hash: commitHash,
          rust_version: rustVersion,
          dfx_version: dfxVersion,
          public_key: publicKey,
          signature,
          optimize_count: optimizeCount
        }
      ]
    })
  },
  HttpAgent: td.func(),
  SignIdentity: td.func(),
  Certificate: {
    create: () => ({
      lookup: () => 'fakeLookup'
    })
  }
});
td.when(new HttpAgent(td.matchers.anything())).thenReturn({
  readState: () => 'fakeState'
});

// MOCK - @dfinity identity
const {Ed25519KeyIdentity} = await import('@dfinity/identity');
td.replace(Ed25519KeyIdentity, 'fromSecretKey', () => 'fakeIdentity');

// MOCK - Octokit
const {Octokit} = td.replace('@octokit/core', {
  Octokit: td.func()
});
const requestMock = td.func();
td.when(requestMock(td.matchers.contains('GET /repos/{owner}/{repo}'), td.matchers.anything())).thenReturn({
  data: {
    permissions: {
      triage: true
    }
  }
});
td.when(new Octokit(td.matchers.anything())).thenReturn({
  request: requestMock
});

// 2022-04-06T19:40:29.457Z
MockDate.set(timestamp);
