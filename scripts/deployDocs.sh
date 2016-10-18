#!/bin/bash

GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -e 'process.stdout.write(require("./package.json").repository.url)')}

cd docs && \
rm -rf .git
git init && \
git config user.name \"Codeship\" && \
git config user.email \"github@codeship.com\" && \
git add . && \
git commit -m "[skip ci] Deploy docs for version $(node -e 'process.stdout.write(require("../package.json").version)')" && \
git push --force "${GIT_DEPLOY_REPO}" master:gh-pages
