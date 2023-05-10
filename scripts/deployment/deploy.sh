#!/bin/bash

NOW=$(date +%y-%m-%d)

cd ~/ENF/docs-ui

git stash 2>>/home/$USER/ENF/logs/error_prod_"$NOW".log >>/home/$USER/ENF/logs/prod_build_"$NOW".log
git pull origin main 2>>/home/$USER/ENF/logs/error_prod_"$NOW".log >>/home/$USER/ENF/logs/prod_build_"$NOW".log
echo "- Pulled latest version of docs-ui"

npm i 2>>/home/$USER/ENF/logs/error_prod_"$NOW".log >>/home/$USER/ENF/logs/prod_build_"$NOW".log
echo "- Installed dependencies"

node scripts/prepare-docs.js --docs-branch=main 2>>/home/$USER/ENF/logs/error_prod_"$NOW".log >>/home/$USER/ENF/logs/prod_build_"$NOW".log
echo "- Prepared docs"

npm run build 2>>/home/$USER/ENF/logs/error_prod_"$NOW".log >>/home/$USER/ENF/logs/prod_build_"$NOW".log
echo "- Built static files"

if [ ! -f "build/index.html" ]; then
  echo "Error: build/index.html file not found"
  exit 1
fi

DIRECTORY=/var/www/html/ENF/production/

if [ ! -d "$DIRECTORY" ]; then
  mkdir -p "$DIRECTORY"
fi

rm -rf "$DIRECTORY"*

mv ./build/* "$DIRECTORY"

echo "- Moved files to: $DIRECTORY"
