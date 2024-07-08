# Symphony Solutions API Task

* Project developed by playwright
* Including Docker file, github actions file

## Pre-requests
* [Node.js](https://nodejs.org/en) should be installed
* [Git](https://git-scm.com/downloads) version control system should be installed
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) you should run docker engines before docker image build
## Instructions for execution
* Clone the repo to your local
* Run the following commands from your project directory on terminal with in order
```
npm init playwright@latest
```
```
npx playwright test
```
```
npx playwright show-report
```

### * Instructions for docker image run
* After clone the repo run the following command from your project directory on terminal
```
docker build -t <imageName>
```
```
docker run <imageName>
```