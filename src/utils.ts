import {Octokit} from "@octokit/core";

export async function validateRepoUrl(url: string, token: string) {
  const urlSplit = url.split("/");
  if (urlSplit?.length !== 2) {
    throw "Wrong url format";
  }

  const octokit = new Octokit({
    auth: token
  });

  let res;
  try {
    res = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: urlSplit[0],
      repo: urlSplit[1]
    });
  } catch (_) {
    throw "Bad credentials or repo not found";
  }

  if (!res.data.permissions?.triage) {
    throw "User must have triage permission";
  }
}
