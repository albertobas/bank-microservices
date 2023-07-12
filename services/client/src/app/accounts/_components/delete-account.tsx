'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteAccountByNumberWithDep } from 'src/features/accounts/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { numberSchema } from 'src/shared/utils/constants';

export function DeleteAccountCard(): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(numberSchema)
  });

  const onSubmit = handleSubmit(async ({ number }) => {
    const response = await deleteAccountByNumberWithDep(number);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Delete an account</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Number</label>
          <input {...register('number')} />
          <p>{errors.number?.message?.toString()}</p>
        </div>
        <input type="submit" />
      </Form>
      {message !== null && <p>{message}</p>}
    </Card>
  );
}
