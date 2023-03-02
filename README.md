<div align="center">
  
  ![banner](docs/ts-js-k6.png)
</div>  
  

# QA k6 Workshop

Performance testing framework for k6 demo.


## Dependencies :toolbox:	

* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
* [Docker](https://docs.docker.com/get-docker/) & Docker Compose
* [K6](https://k6.io/docs/getting-started/installation/) (for native runs)

## Quick Start :zap:

* Clone this repository
* Run `yarn install`
* Run `yarn build` to create a build of the source code under the `dist` folder.
* If run with native k6 support execute `k6 run dist/<script_name>.js`
* Run `yarn run-docker` to run a sample scenario.

## Github Actions
The tests can run directly from GA just by using the appropriate workflow load.yml under workflows. It will generate a summary.html report on GitHub if we want to visualize metrics and results. The job is triggered manually but we can set a smoke suite per PR merge.


## Monitoring :chart_with_upwards_trend:
![Screenshot 2022-09-19 at 7 52 10 PM](https://user-images.githubusercontent.com/1075568/191215641-81a1f568-2885-4e1b-aa3e-cb7cc5a4199c.png)

The framework supports monitoring via Grafana and InfluxDB. Both of them are setup locally as docker containers and orchestrated via Docker Compose. To start-up monitoring

* Start them via `yarn monitor`
* Go to `localhost:3000` in your browser
* Navigate to `Dashboards` and then `Import`
* Go to the `Import via grafana.com` form and add 2587 or find the ID of any other K6 compatible dashboard from [Grafana](https://grafana.com/grafana/dashboards/?search=k6)
* Run the test via `yarn run-docker` and see results being visualised.

We will use the official APIs from k6.io under [here](https://test-api.k6.io/)
