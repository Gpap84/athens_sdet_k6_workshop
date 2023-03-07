import { group } from "k6";
import { Options } from "k6/options";
import { Crocodile } from "../../lib/types/crocodile.api";
import * as publicUserActions from "../../actions/roles/public-user.role";

// Test Options https://docs.k6.io/docs/options
export let options: Partial<Options> = {
  scenarios: {
    spike: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 1000,
      timeUnit: "1s",
      stages: [
        { duration: "10s", target: 10 }, // below normal load
        { duration: "1m", target: 10 },
        { duration: "10s", target: 140 }, // spike to 140 iterations
        { duration: "3m", target: 140 }, // stay at 140 for 3 minutes
        { duration: "10s", target: 10 }, // scale down. Recovery stage.
        { duration: "3m", target: 10 },
        { duration: "10s", target: 0 },
      ],
      gracefulStop: "2m",
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
