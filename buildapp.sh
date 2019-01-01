#!/usr/bin/env bash

npm run build --prefix frontend
rm -rf ./assets
mv ./frontend/build ./assets

