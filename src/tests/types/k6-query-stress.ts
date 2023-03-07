import { group } from "k6";
import { Options } from "k6/options";
import { Crocodile } from "../../lib/types/crocodile.api";
import * as publicUserActions from "../../actions/roles/public-user.role";

// Test Options https://docs.k6.io/docs/options
export let options: Partial<Options> = {
  scenarios: {
    stress: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 500,
      timeUnit: "1s",
      stages: [
        { duration: "2m", target: 10 }, // below normal load
        { duration: "5m", target: 10 },
        { duration: "2m", target: 20 }, // normal load
        { duration: "5m", target: 20 },
        { duration: "2m", target: 30 }, // around the breaking point
        { duration: "5m", target: 30 },
        { duration: "2m", target: 40 }, // beyond the breaking point
        { duration: "5m", target: 40 },
        { duration: "10m", target: 0 }, // scale down. Recovery stage.
      ],
    },
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
