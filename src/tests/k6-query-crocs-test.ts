import { group } from "k6";
import { Options } from "k6/options";
import { Crocodile } from "../lib/types/crocodile.api";
import * as publicUserActions from "../actions/roles/public-user.role";

// Test Options https://docs.k6.io/docs/options
export let options: Partial<Options> = {
  // a single stage where we ramp up to 10 users over 30 seconds
  stages: [{ target: 20, duration: "20s" }],

  // test thresholds https://docs.k6.io/docs/thresholds
  thresholds: {
    http_req_duration: ["avg<500", "p(95)<1500"],
    "http_req_duration{name:PublicCrocs}": ["avg<400"],
  },
};

const BASE_URL = `${__ENV.BASE_URL}`;

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default () => {
  group("Query and Check Crocs", () => {
    let crocodiles: Crocodile[] = [];
    crocodiles = publicUserActions.queryCrocodiles(BASE_URL, crocodiles);
    publicUserActions.checkAges(crocodiles, 5);
  });
};
