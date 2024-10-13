#!/bin/bash
ssh matthias@web260.msouthwick.com << ENDSSH
rm -rf startup/public
mkdir -p startup/public
ENDSSH
scp -r build/* matthias@web260.msouthwick.com:startup/public