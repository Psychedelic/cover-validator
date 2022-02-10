import "./__test_data__/env";
import {badData, goodData} from "./__test_data__/buildWasmRequest";
import {getAPIEvent} from "./__test_utils__/utils";
import test from "ava";

test("Build request failed with bad data", async t => {
  const {handler} = await import("../handlers/build");
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
  const {handler} = await import("../handlers/build");
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
