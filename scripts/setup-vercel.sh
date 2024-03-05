#!/bin/bash

# Compile i18n
pnpm run lingui:compile

# Run Next.js build for the main project
pnpm run build:logs
pnpm run build
