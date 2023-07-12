#!/bin/sh

adduser -D expressjs
su expressjs

node services/customers/dist/api/v1/index.js