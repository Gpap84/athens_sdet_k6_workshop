import { group } from "k6";
import { Options } from "k6/options";
import { Crocodile } from "../../lib/types/crocodile.api";
import * as publicUserActions from "../../actions/roles/public-user.role";

// Test Options https://docs.k6.io/docs/options
export let options: Partial<Options> = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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
