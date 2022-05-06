import "./__test_data__/env";
import test from "ava";

import {badData, goodData} from "./__test_data__/buildConfigRequest";
import {getAPIEvent} from "./__test_utils__/utils";

const {handler} = await import("../handlers/build");

test("Failed with bad data", async t => {
  const results = await Promise.all(badData.map(data => handler(getAPIEvent(data))));
  results.forEach(result => {
    t.like(result, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      statusCode: 400
    });
  });
});

test("Success", async t => {
  const results = await Promise.all(goodData.map(data => handler(getAPIEvent(data))));
  results.forEach(result => {
    t.deepEqual(result, {
      body: undefined,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      statusCode: 200
    });
  });
});
