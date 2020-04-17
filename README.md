# **Test K8s**

Fork some part of `hms-widget-sdk` on branch name `feature/sprint4`.

POC zero-downtime strategy on K8s with simple clock application.

## **Scenario**

 1. The application take more time to download/install dependencies.
 2. User should not see gap of time on digital clock after :
    - developer deployed source code in new version.
    - service was cutoff.
 3. Digital clock MUST NOT stop.

## **Project structure**

```bash
repository
|- app            # <------------ main service
.
.
|- test.html      # <------------ time monitoring here
|- ...
`- README.md
```

## **Usage**

### 1. Start Main app

```bash
# from root directory
$ cd app
$ npm i
$ npm run dev
```

### 2. Open monitoring file (HTML)

Double click on `test.html`

Enjoy monitor it