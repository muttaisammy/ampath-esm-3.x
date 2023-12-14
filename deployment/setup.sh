#!/bin/bash

# Clean up previous build artifacts
echo "Cleaning up previous build artifacts ..."
rm -rf openmrs-config-amrs
rm -rf frontend

# Build assets
echo "Building AMRS 3.x assets ..."
CWD=$(pwd)
npx --legacy-peer-deps openmrs@next build \
  --build-config ./configuration/build-config.json \
  --target ./frontend \
  --page-title "AMRS" \
  --support-offline false

# Assemble assets
echo "Assembling assets ..."
npx --legacy-peer-deps openmrs@next assemble \
  --manifest \
  --mode config \
  --config ./configuration/build-config.json \
  --target ./frontend

# Copy required files
echo "Copying required files ..."
cp "${CWD}/assets/logo.png" "${CWD}/frontend"
cp "${CWD}/assets/ampath-logo.png" "${CWD}/frontend"
cp "${CWD}/assets/favicon.ico" "${CWD}/frontend"
cp "${CWD}/configuration/config.json" "${CWD}/frontend"
mv "${CWD}/frontend/config.json" "${CWD}/frontend/config.json"

# Exit with success status
exit 0
