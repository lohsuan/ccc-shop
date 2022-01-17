#!/usr/bin/env sh
set -e

yarn build

cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/lohsuan/ccc-shop.git master:gh-pages

cd -