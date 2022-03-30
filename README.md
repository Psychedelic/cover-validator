![](https://docs.covercode.ooo/overview/imgs/mainn.png)

# Cover Validator

Cover validator is a set of AWS lambda functions that help validate user request’s inputs before getting forwarded to [Cover](https://covercode.ooo/) canister or Cover builder.

- [Main Repo](https://github.com/Psychedelic/cover/)
- [Cover Builder](https://github.com/Psychedelic/cover-builder/)

## REST API

- **_Cover only support DFX 0.8.4 or above_**
- If you're using DFX 0.9.3 and above, when you build your wasm, DFX might automatically optimize the wasm for you, so beware of that when input the`optimize_count`
- These APIs will check if:
  - The inputs are in the right format?
  - The caller has the right canister repo access permission?
  - The caller is the controller of the canister?
  - The caller really owned the provided `ownerId`?
- How to get `signature` and `publicKey`:
  - `signature` is signed with the `canisterId` being the message.
  - You can refer to these documents: [Secp256k1](https://github.com/dfinity/keysmith) or [Ed25519](https://github.com/Psychedelic/dfx-key)
- Cover validator and builder will update the build status for you to follow. You can only re-build your canister when the Cover builder finishes its job and updates the status to either Error or Success. If the Cover builder failed to update build status, you’ll have to wait **5 minutes** before rebuilding your canister. So make sure to fill your inputs correctly.

### Save a build config

- Save a build config to Cover canister to reuse later (login required)
- Required inputs:
  - `canisterId` (string): ID of the canister you want to build
  - `canisterName` (string): name of the canister
  - `repoUrl` (string): github repo of the canister in format **{server}/{repo}**
  - `repoAccessToken` (string): Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo. [How to create Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
  - `commitHash` (hex string): the commit hash that gets built
  - `rustVersion` (string): Rust version to build the wasm, optional if you don’t use ic-cdk-optimizer, must be specified if you want to optimize your wasm.
  - `dfxVersion` (string): Dfx version to build the wasm
  - `optimizeCount` (number): The times you want to optimize your wasm. 1 is recommended (after the first time, the wasm isn’t going to be significantly smaller anymore). If `optimizeCount` > 0, `rustVersion` must be specified.
  - `publicKey` (hex string): public key of `ownerId`
  - `signature` (hex string): signature of `ownerId`
  - `ownerId` (hex string): the controller of the canister
- Example:

```bash
curl -X POST \
-H 'content-type: application/json' \
${COVER_VALIDATOR_URL}/save-build-config -d \
'{
    "canisterId": "xyzoo-abcd-aaaai-abgca-cai",
    "canisterName": "cover",
    "repoUrl": "psychedelic/cover",
    "repoAccessToken": "ghp_1VxFGDfsdfasdfWER34SADF",
    "commitHash": "b2724523128eb8d5bd823961de31a2f10bd48b94",
    "rustVersion": "1.58.1",
    "dfxVersion": "0.8.4",
    "optimizeCount": 1,
    "publicKey": "4a9048818a978dbd2113e2dacfc370b699c700e8786ccc5980c31839a9af7c89",
    "signature": "6dda0e5c6a2a5716df8afe26418680675e64c6e8f3c30bab74d46bb33fe1ed621c179a7c8af2f554cbe213ddc89244f00c6cca95d43078aa24ac474075167164",
    "ownerId": "12345-46f74-s45g5-54321-c5vyq-4zv7t-54321-omikc-54321-olpgg-rqe"
}'
```

### Build

- Build provided config without login or save the config to Cover canister (user has to re-enter all the fields everytime send a build request since the config hasn't been saved)
- Required inputs:
  - `canisterId` (string): ID of the canister you want to build
  - `canisterName` (string): name of the canister
  - `repoUrl` (string): github repo of the canister in format **{server}/{repo}**
  - `repoAccessToken` (string): Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo.
  - `commitHash` (hex string): the commit hash that gets built
  - `rustVersion` (string): Rust version to build the wasm, optional if you don’t use ic-cdk-optimizer, must be specified if you want to optimize your wasm.
  - `dfxVersion` (string): Dfx version to build the wasm
  - `optimizeCount` (number): The times you want to optimize your wasm. 1 is recommended (after the first time, the wasm isn’t going to be significantly smaller anymore). If `optimizeCount` > 0, `rustVersion` must be specified.
  - `publicKey` (hex string): public key of `ownerId`
  - `signature` (hex string): signature of `ownerId`
  - `ownerId` (hex string): the controller of the canister
- Example:

```bash
curl -X POST \
-H 'content-type: application/json' \
${COVER_VALIDATOR_URL}/build -d \
'{
    "canisterId": "xyzoo-abcd-aaaai-abgca-cai",
    "canisterName": "cover",
    "repoUrl": "psychedelic/cover",
    "repoAccessToken": "ghp_1VxFGDfsdfasdfWER34SADF",
    "commitHash": "b2724523128eb8d5bd823961de31a2f10bd48b94",
    "rustVersion": "1.58.1",
    "dfxVersion": "0.8.4",
    "optimizeCount": 1,
    "publicKey": "4a9048818a978dbd2113e2dacfc370b699c700e8786ccc5980c31839a9af7c89",
    "signature": "6dda0e5c6a2a5716df8afe26418680675e64c6e8f3c30bab74d46bb33fe1ed621c179a7c8af2f554cbe213ddc89244f00c6cca95d43078aa24ac474075167164",
    "ownerId": "12345-46f74-s45g5-54321-c5vyq-4zv7t-54321-omikc-54321-olpgg-rqe"
}'
```

### Build with config

- Build an existing config from the Cover canister (login required)
- Required inputs:
  - `canisterId` (string): ID of the canister you want to build
  - `publicKey` (hex string): public key of `ownerId`
  - `repoAccessToken` (string): Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo.
  - `signature` (hex string): signature of `ownerId`
  - `ownerId` (hex string): the controller of the canister
- Example:

```bash
curl -X POST \
-H 'content-type: application/json' \
${COVER_VALIDATOR_URL}/build-with-config -d \
'{
    "canisterId": "xyzoo-abcd-aaaai-abgca-cai",
    "ownerId": "12345-46f74-s45g5-54321-c5vyq-4zv7t-54321-omikc-54321-olpgg-rqe",
    "publicKey": "4a9048818a978dbd2113e2dacfc370b699c700e8786ccc5980c31839a9af7c89",
    "signature": "6dda0e5c6a2a5716df8afe26418680675e64c6e8f3c30bab74d46bb33fe1ed621c179a7c8af2f554cbe213ddc89244f00c6cca95d43078aa24ac474075167164",
    "repoAccessToken": "ghp_1VxFGDfsdfasdfWER34SADF"
}'
```
