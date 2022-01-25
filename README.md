# Cover Validator

Cover validator is a set of lambda functions that help validate user request’s inputs before getting forwarded to Cover canister or Cover builder.

## API
- These APIs will check if:
    - The inputs are in the right format?
    - The caller has the canister repo access permission?
    - The caller is the controller of the canister?
    - The caller really owned the provided canister id? 
  
- How to get `signature` and `publicKey`:
    - You can refer to these documents: [Secp256k1](https://github.com/dfinity/keysmith) or [Ed25519](https://github.com/Psychedelic/dfx-key)

### Save a build config
- Save a build config to Cover canister to reuse later (login required)
- Required inputs:
    - `canisterId` : ID of the canister you want to build
    - `canisterName` : name of the canister
    - `repoUrl` : github repo of the canister in format **{server}/{repo}**
    - `repoAccessToken` : Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo. 
    - `commitHash` : the commit hash that gets built
    - `rustVersion` : Rust version of the canister, optional if you don’t use ic-cdk-optimizer, must be specified if you want to optimize your wasm.
    - `dfxVersion` : Dfx version of the canister
    - `optimizeCount` : The times you want to optimize your wasm. 1 is recommended (after the first time, the wasm isn’t going to be significantly smaller anymore). If `optimizeCount` > 0, `rustVersion` must be specified.
    - `publicKey`: public key of `userPrincipal`
    - `signature`: signature of `userPrincipal`
    - `userPrincipal`: the controller of the canister
 - Example: 

```
  curl -X POST \
     -H 'content-type: application/json' \
     ${COVER_VALIDATOR_SAVE_BUILD_CONFIG_URL} \
     -d '{ "canisterId":"yumdn-oaaai-aaaai-obeva-cai", \
     "canisterName":"cover-validator","repoUrl":"Psychedelic/cover-validator", \
     "userAccessToken":"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", \
     "commitHash":"f42b604ca46070f6422435e1bf204ea6796d0a36", \
     "rustVersion":"1.57.0", "dfxVersion":"0.8.4", "optimizeTimes":1, \
     "publicKey":"ae68ea737af7dc455b4b4210e520bc403ab4561e1e818756071cb84629d8ed0e", \
     "signature":"8a42a153a3cd39cf470a1a32ddf8c423641808708edc827dba7a044382f1353fe30337729f17f7f07296a2591ce809489a5f30421df25284628adaeeece97108", \
     "userPrincipal":"pqc30-dla4t-e02wp-ypr4u-ujegb-pnige-n65cs-4fv34-vt07w-ctkbw-1qe" }'
```


### Build 
- Build provided config without login or save the config to Cover canister (user has to re-enter all the fields everytime send a build request since the config hasn't been saved)
- Required inputs:
    - `canisterId` : ID of the canister you want to build
    - `canisterName` : name of the canister
    - `repoUrl` : github repo of the canister in format **{server}/{repo}**
    - `repoAccessToken` : Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo. 
    - `commitHash` : the commit hash that gets built
    - `rustVersion` : Rust version of the canister, optional if you don’t use ic-cdk-optimizer, must be specified if you want to optimize your wasm.
    - `dfxVersion` : Dfx version of the canister
    - `optimizeCount` : The times you want to optimize your wasm. 1 is recommended (after the first time, the wasm isn’t going to be significantly smaller anymore). If `optimizeCount` > 0, `rustVersion` must be specified.
    - `publicKey`: public key of `userPrincipal`
    - `signature`: signature of `userPrincipal`
    - `userPrincipal`: the controller of the canister
- Example: 

```
  curl -X POST \
     -H 'content-type: application/json' \
     ${COVER_VALIDATOR_BUILD_URL} \
     -d '{ "canisterId":"yumdn-oaaai-aaaai-obeva-cai", \
     "canisterName":"cover-validator","repoUrl":"Psychedelic/cover-validator", \
     "userAccessToken":"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", \
     "commitHash":"f42b604ca46070f6422435e1bf204ea6796d0a36", \
     "rustVersion":"1.57.0", "dfxVersion":"0.8.4", "optimizeTimes":1, \
     "publicKey":"ae68ea737af7dc455b4b4210e520bc403ab4561e1e818756071cb84629d8ed0e", \
     "signature":"8a42a153a3cd39cf470a1a32ddf8c423641808708edc827dba7a044382f1353fe30337729f17f7f07296a2591ce809489a5f30421df25284628adaeeece97108", \
     "userPrincipal":"pqc30-dla4t-e02wp-ypr4u-ujegb-pnige-n65cs-4fv34-vt07w-ctkbw-1qe" }'
```
    
### Build with config
- Build an existing config from the Cover canister (login required)
- Required inputs:
    - `canisterId`: ID of the canister you want to build
    - `publicKey`: public key of `userPrincipal`
    - `repoAccessToken` : Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo. 
    - `signature`: signature of `userPrincipal`
    - `userPrincipal`: the controller of the canister
- Example: 

```
  curl -X POST \
     -H 'content-type: application/json' \
     ${COVER_VALIDATOR_BUILD_WITH_CONFIG_URL} \
     -d '{ "canisterId":"yumdn-oaaai-aaaai-obeva-cai", \
     "publicKey":"ae68ea737af7dc455b4b4210e520bc403ab4561e1e818756071cb84629d8ed0e", \
     "userAccessToken":"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", \
     "signature":"8a42a153a3cd39cf470a1a32ddf8c423641808708edc827dba7a044382f1353fe30337729f17f7f07296a2591ce809489a5f30421df25284628adaeeece97108", \
     "userPrincipal":"pqc30-dla4t-e02wp-ypr4u-ujegb-pnige-n65cs-4fv34-vt07w-ctkbw-1qe" }'
```
