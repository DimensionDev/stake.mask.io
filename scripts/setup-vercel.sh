#!/bin/bash

# Compile i18n
pnpm run lingui:compile

# Run vercel build for the main project
pnpm run build
