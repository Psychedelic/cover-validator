import "./__test_data__/env";
import {badData, goodData} from "./__test_data__/buildWithConfigRequest";
import {getAPIEvent} from "./__test_utils__/utils";
import test from "ava";

const {handler} = await import("../handlers/buildWithConfig");

test("Failed with bad data", async t => {
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

test("Success", async t => {
  const result = await handler(getAPIEvent(goodData));
  t.deepEqual(result, {
    body: undefined,
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 200
  });
});
