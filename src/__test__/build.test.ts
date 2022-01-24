import {badData, goodData} from "./__test_data__/buildConfigRequest";
import {getAPIEvent} from "./__test_utils__/utils";
import {handler} from "../handlers/build";
import test from "ava";

test("Build request failed with bad data", async t => {
  const results = await Promise.all(badData.map(data => handler(getAPIEvent(data))));
  results.forEach(result => {
    t.like(result, {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 400
    });
  });
});

test("Build request success", async t => {
  const results = await Promise.all(goodData.map(data => handler(getAPIEvent(data))));
  results.forEach(result => {
    t.deepEqual(result, {
      body: undefined,
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200
    });
  });
});
