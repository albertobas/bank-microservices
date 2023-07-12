#!/bin/bash
set -e
mongosh <<EOF
db = db.getSiblingDB($MONGO_INITDB_DATABASE);
db.createCollection('v1');
db.v1.insertMany([
  {
    derogatoryPublicRecs: 1,
    dti: 19.7,
    identifier: 1,
    inquiriesLast6Mths: 2,
    fico: 700,
    logAnnualIncome: 10.8
  },
  {
    derogatoryPublicRecs: 0,
    dti: 19.5,
    identifier: 2,
    inquiriesLast6Mths: 1,
    fico: 690.3,
    logAnnualIncome: 11.0
  },
  {
    derogatoryPublicRecs: 1,
    dti: 19.3,
    identifier: 3,
    inquiriesLast6Mths: 0,
    fico: 698,
    logAnnualIncome: 10.6
  },
  {
    derogatoryPublicRecs: 1,
    dti: 4,
    identifier: 4,
    inquiriesLast6Mths: 0,
    fico: 667,
    logAnnualIncome: 10.714418
  }
]);
EOF