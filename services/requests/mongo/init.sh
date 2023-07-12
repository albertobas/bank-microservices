#!/bin/bash
set -e
mongosh <<EOF
db = db.getSiblingDB($MONGO_INITDB_DATABASE);
db.createCollection('v1');
db.v1.insertMany([
  {
    identifier: 1,
    accountNumber: 1,
    serviceId: 'loan_basic',
    servicePurpose: 'educational',
    timestamp: Date.now()
  },
  {
    identifier: 2,
    accountNumber: 2,
    serviceId: 'loan_premium',
    servicePurpose: 'debt_consolidation',
    timestamp: Date.now()
  }
]);
EOF