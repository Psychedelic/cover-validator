import {badData, goodData} from "./__test_data__/buildConfigRequest";
import {getAPIEvent} from "./__test_utils__/utils";
import {handler} from "../handlers/buildWithConfig";
import test from "ava";

test("Build request with config failed", async t => {
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

test("Build request with config success", async t => {
  const result = await handler(getAPIEvent(goodData));
  t.deepEqual(result, {
    body: undefined,
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 200
  });
});
