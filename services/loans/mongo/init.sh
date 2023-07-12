#!/bin/bash
set -e
mongosh <<EOF
db = db.getSiblingDB($MONGO_INITDB_DATABASE);
db.createCollection('v1');
db.v1.insertMany([
  {
    creditPolicy: Boolean(true),
    customerId: 1,
    delinquencies2Yrs: 0,
    daysWithCreditLine: 3456,
    identifier: 1,
    installment: 500.50,
    intRate: 0.13,
    isDefault: Boolean(false),
    purpose: 'debt_consolidation',
    revolBal: 28000,
    revolUtil: 52.5
  },
  {
    creditPolicy: Boolean(true),
    customerId: 2,
    delinquencies2Yrs: 0,
    daysWithCreditLine: 2700,
    identifier: 2,
    installment: 200,
    intRate: 0.10,
    isDefault: Boolean(false),
    purpose: 'credit_card',
    revolBal: 33000,
    revolUtil: 70.3
  },
  {
    creditPolicy: Boolean(true),
    customerId: 3,
    delinquencies2Yrs: 0,
    daysWithCreditLine: 3456,
    identifier: 3,
    installment: 500.50,
    intRate: 0.14,
    isDefault: Boolean(false),
    purpose: 'debt_consolidation',
    revolBal: 42010,
    revolUtil: 50.3
  },
  {
    creditPolicy: Boolean(true),
    customerId: 4,
    delinquencies2Yrs: 0,
    daysWithCreditLine: 3180.041667,
    identifier: 4,
    installment: 194.02,
    intRate: 0.1496,
    isDefault: Boolean(true),
    purpose: 'debt_consolidation',
    revolBal: 3839.0,
    revolUtil: 76.8
  }
]);
EOF
