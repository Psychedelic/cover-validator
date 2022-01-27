# Cover validator

## Run unit test

- `NODE_ENV` : enviroment to test (development/production)
- `COVER_CANISTER_ID`: principal ID of cover canister
- `SIGNATURE`: signature of `userPrincipal` with `canisterId` being the message
- `REPO_ACCESS_TOKEN`: Personal Access Token of a github account that is an **OWNER** or has **TRIAGE** permission to the canister repo

Example:

```bash
$ NODE_ENV=development
$ COVER_CANISTER_ID=2x7en-uqaaa-aaaai-abgca-cai
$ SIGNATURE=8a52a153a3cd39cf470a1c82ddf8c423641819708edc827dba7a044
$ REPO_ACCESS_TOKEN=ghp_8vBH23yomPBcv7a79gilYqQA01mLN20jAl1C
$ npm t
```
