'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { withdrawFromAccountWithDep } from 'src/features/accounts/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { amountNumberSchema } from 'src/shared/utils/constants';

export function WithdrawFromAccountCard(): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(amountNumberSchema)
  });

  const onSubmit = handleSubmit(async ({ number, amount }) => {
    const response = await withdrawFromAccountWithDep(number, amount);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Withdraw from an account</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Number</label>
          <input {...register('number')} />
          <p>{errors.number?.message?.toString()}</p>
        </div>
        <div>
          <label>Amount</label>
          <input {...register('amount')} />
          <p>{errors.amount?.message?.toString()}</p>
        </div>
        <input type="submit" />
      </Form>
      {message !== null && <p>{message}</p>}
    </Card>
  );
}
