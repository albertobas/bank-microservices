'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoanByIdentifierWithDep, requestLoanDefaultPredictionWithDep } from 'src/features/loans/core/interactors';
import { getCustomerByIdentifierWithDep } from 'src/features/customers/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { identifierSchema } from 'src/shared/utils/constants';

export function RequestLoanDefaultCard(): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(identifierSchema)
  });

  const onSubmit = handleSubmit(async ({ identifier }) => {
    const loanResponse = await getLoanByIdentifierWithDep(identifier);
    if (loanResponse.data) {
      const {
        creditPolicy,
        customerId,
        delinquencies2Yrs,
        daysWithCreditLine,
        installment,
        intRate,
        purpose,
        revolBal,
        revolUtil
      } = loanResponse.data;
      const customerResponse = await getCustomerByIdentifierWithDep(customerId);
      if (customerResponse.data) {
        const { derogatoryPublicRecs, dti, inquiriesLast6Mths, fico, logAnnualIncome } = customerResponse.data;
        const loanDefault = {
          creditPolicy,
          purpose,
          intRate,
          installment,
          logAnnualIncome,
          dti,
          fico,
          daysWithCreditLine,
          revolBal,
          revolUtil,
          inquiriesLast6Mths,
          delinquencies2Yrs,
          derogatoryPublicRecs
        };
        const response = await requestLoanDefaultPredictionWithDep(identifier, loanDefault);
        console.log('RESPONSE:', response);
        setMessage(response.message);
      } else {
        const msg = 'There has been an error, customer data could not be retrieved.';
        console.log(msg);
        setMessage(msg);
      }
    } else {
      const msg = 'There has been an error, loan data could not be retrieved.';
      console.log(msg);
      setMessage(msg);
    }
    reset();
  });

  return (
    <Card>
      <h2>Request a loan default prediction</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Identifier</label>
          <input {...register('identifier')} />
          <p>{errors.identifier?.message?.toString()}</p>
        </div>
        <input type="submit" />
      </Form>
      {message !== null && <p>{message}</p>}
    </Card>
  );
}
