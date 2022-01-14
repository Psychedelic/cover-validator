import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager";
import {Ed25519KeyIdentity} from "@dfinity/identity";

interface Config {
  coverCanisterId: string;
  icHost: string;
  nodeEnv: string;
  identity: Ed25519KeyIdentity;
  coverGithubToken: string;
}

interface SecretData {
  coverGithubToken: string;
  coverValidatorPrivateKey: string;
}

const client = new SecretsManagerClient({region: "us_east_1"});

const command = new GetSecretValueCommand({SecretId: "coverDev"});

const secret = await client.send(command);

const secretData: SecretData = JSON.parse(secret.SecretString as string);

if (!secretData.coverGithubToken) {
  throw new Error("Couldn't load cover token");
}

if (!secretData.coverValidatorPrivateKey) {
  throw new Error("Couldn't load private key");
}

const identity = Ed25519KeyIdentity.fromSecretKey(Buffer.from(secretData.coverValidatorPrivateKey, "hex"));

let coverCanisterId: string;
if (process.env.COVER_CANISTER_ID) {
  coverCanisterId = process.env.COVER_CANISTER_ID;
} else {
  throw new Error("Couldn't load canister Id");
}

const nodeEnv = process.env.NODE_ENV || "local";

const icHost = nodeEnv === "local" ? "http://host.docker.internal:8000" : "https://ic0.app";

const config: Config = {coverCanisterId, icHost, nodeEnv, identity, coverGithubToken: secretData.coverGithubToken};

export default config;
