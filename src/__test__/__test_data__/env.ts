import * as td from "testdouble";
import {Decoder} from "cbor";
import {Principal} from "@dfinity/principal";
import {userPrincipal} from "./dump";

//  MOCK - cbor
td.replace(Decoder, "decodeFirstSync", () => ({
  value: [Principal.fromText(userPrincipal).toUint8Array()]
}));

// MOCK - cover canister id
process.env.COVER_CANISTER_ID = "fakeCoverCanisterId";

// MOCK - aws secrets manager
const {SecretsManagerClient} = td.replace("@aws-sdk/client-secrets-manager", {
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
const {HttpAgent, Certificate} = td.replace("@dfinity/agent", {
  Actor: {
    createActor: () => ({
      registerVerification: () => ({
        Ok: null
      })
    })
  },
  HttpAgent: td.func(),
  SignIdentity: td.func(),
  Certificate: td.func()
});
td.when(new HttpAgent(td.matchers.anything())).thenReturn({
  readState: () => "fakeState"
});
td.when(new Certificate(td.matchers.anything(), td.matchers.anything())).thenReturn({
  verify: () => "fakeVerify",
  lookup: () => "fakeLookup"
});

// MOCK - @dfinity identity
const {Ed25519KeyIdentity} = await import("@dfinity/identity");
td.replace(Ed25519KeyIdentity, "fromSecretKey", () => "fakeIdentity");

// MOCK - Octokit
const {Octokit} = td.replace("@octokit/core", {
  Octokit: td.func()
});
const requestMock = td.func();
td.when(requestMock(td.matchers.contains("GET /repos/{owner}/{repo}"), td.matchers.anything())).thenReturn({
  data: {
    permissions: {
      triage: true
    }
  }
});
td.when(new Octokit(td.matchers.anything())).thenReturn({
  request: requestMock
});
