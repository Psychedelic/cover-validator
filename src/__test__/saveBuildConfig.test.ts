import {badData, goodData} from "./__test_data__/buildConfigRequest";
import {getAPIEvent} from "./__test_utils__/utils";
import {handler} from "../handlers/saveBuildConfig";
import test from "ava";

test("Create build config failed with bad data", async t => {
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

test("Create build config successfully", async t => {
  const result = await handler(getAPIEvent(goodData));
  t.deepEqual(result, {
    body: undefined,
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 200
  });
});
