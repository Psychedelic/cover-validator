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

const secretKey = process.env.SECRET_KEY;
if (secretKey) {
  throw new Error("Couldn't load SECRET_KEY");
}

const client = new SecretsManagerClient({region: "us-east-1"});

const command = new GetSecretValueCommand({SecretId: secretKey});

const secret = await client.send(command);

const secretData: SecretData = JSON.parse(secret.SecretString as string);

if (!secretData.coverGithubToken) {
  throw new Error("Couldn't load cover github token");
}

if (!secretData.coverValidatorPrivateKey) {
  throw new Error("Couldn't load cover validator private key");
}

const identity = Ed25519KeyIdentity.fromSecretKey(Buffer.from(secretData.coverValidatorPrivateKey, "hex"));

const coverCanisterId = process.env.COVER_CANISTER_ID;

if (!coverCanisterId) {
  throw new Error("Couldn't load cover canister Id");
}

const nodeEnv = process.env.NODE_ENV || "local";

const icHost = nodeEnv === "local" ? "http://host.docker.internal:8000" : "https://ic0.app";

const config: Config = {coverCanisterId, icHost, nodeEnv, identity, coverGithubToken: secretData.coverGithubToken};

export {config};
