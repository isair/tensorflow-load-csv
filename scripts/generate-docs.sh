#! /usr/bin/env bash

set -eu

cd "$(dirname "$0")"/.. || exit 1

clean_up() {
  rm -rf tmp 2>/dev/null
  git worktree remove docs -f 2>/dev/null
}

trap "clean_up" ERR

git worktree add -f -B gh-pages docs origin/gh-pages

npx typedoc src/index.ts src/loadCsv.ts src/loadCsv.models.ts --out tmp

pushd docs
find . -not -path '*/\.*' -maxdepth 1 -exec rm -rf {} \;
popd

cp -rp tmp/* docs

pushd docs
git add .
git commit -m 'docs(gh-pages): Update docs'
git push origin gh-pages
popd

clean_up
