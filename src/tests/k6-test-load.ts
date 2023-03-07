import { group } from "k6";
import { Options } from "k6/options";
import { Crocodile } from "../lib/types/crocodile.api";
import * as publicUserActions from "../actions/roles/crocodile-owner.role"

// Test Options https://docs.k6.io/docs/options
export let options: Partial<Options> = {
  stages: [
    { duration: '20s', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '20s', target: 20 }, // stay at 100 users for 10 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = `${__ENV.BASE_URL}`;

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default () => {
  group("Query and Check Crocs", () => {
    let crocodiles: Crocodile[] = [];
    crocodiles = publicUserActions.queryCrocodiles(BASE_URL, crocodiles);
  });
};
