#!/bin/bash
ssh matthias@web260.msouthwick.com << ENDSSH
rm -rf startup-frontend/public
mkdir -p startup-frontend/public
ENDSSH
scp -r build/* matthias@web260.msouthwick.com:startup-frontend/public