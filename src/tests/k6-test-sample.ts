import http from "k6/http";
import { sleep, check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = `${__ENV.BASE_URL}`;

export const options = {
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/public/crocodiles/`);
  check(res, {
    "is status 200": (r) => r.status === 200,
    "Name of Croc": (r) =>  r.json()[0].name === "Bert"
  });
    
  console.log(res.body);

  sleep(5);
}

export function handleSummary(data: any) {
  return {
    "dist/summary.html": htmlReport(data),
  };
}
