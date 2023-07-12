'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createLoanWithDep } from 'src/features/loans/core/interactors';
import { Loan } from 'bank-utils/api/v1/entities';
import { loanSchema } from 'src/shared/utils/constants';
import { LoanForm } from './loan-form';
import { Card } from 'src/app/_components';

export function CreateLoanCard(): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(loanSchema)
  });

  const onSubmit = handleSubmit(async ({ creditPolicy, isDefault, ...rest }) => {
    const response = await createLoanWithDep({
      creditPolicy: Boolean(creditPolicy),
      isDefault: Boolean(isDefault),
      ...rest
    } as Loan);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Create a loan</h2>
      <LoanForm onSubmit={onSubmit} register={register} errors={errors} />
      {message !== null && <p>{message}</p>}
    </Card>
  );
}
