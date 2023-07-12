#!/bin/bash
set -e
mongosh <<EOF
db = db.getSiblingDB($MONGO_INITDB_DATABASE);
db.createCollection('v1');
db.v1.insertMany([
  {
    type: 'savings',
    currency: 'eur',
    balance: 30000,
    number: 1,
    customerId: 1
  },
  {
    type: 'savings',
    currency: 'eur',
    balance: 10000,
    number: 2,
    customerId: 2
  },
  {
    type: 'checking',
    currency: 'eur',
    balance: 5000,
    number: 3,
    customerId: 2
  }
]);
EOF