#!/bin/sh

adduser -D expressjs
su expressjs

node services/loans/dist/api/v1/index.js