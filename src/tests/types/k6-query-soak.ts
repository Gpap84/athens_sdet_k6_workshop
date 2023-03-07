import { group } from "k6";
import { Options } from "k6/options";
import { Crocodile } from "../../lib/types/crocodile.api";
import * as publicUserActions from "../../actions/roles/public-user.role";

// Test Options https://docs.k6.io/docs/options
export let options: Partial<Options> = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
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
