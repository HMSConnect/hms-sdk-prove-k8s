# **Test K8s**

Fork some part of `hms-widget-sdk` on branch name `feature/sprint4`.

POC zero-downtime strategy on K8s with simple clock application.

## **Scenario**

 - The application take more time to download/install dependencies.
 - User should not see grab of time on digital clock after developer deployed source code in new version.
 - Digital clock MUST NOT stop.

## **Project structure**

```bash
repository
|- app            # <------------ main service
.
.
|- fake           # <------------ data source for main service
|- ...
`- README.md
```

## **Usage**

### 1. Start Data source

```bash
# from root directory
$ cd app
$ npm i
$ npm run dev
```

### 2. Start Main app

```bash
# from root directory
$ cd app
$ npm i
$ npm run dev
```

Enjoy via 

```
http://localhost:3000
```