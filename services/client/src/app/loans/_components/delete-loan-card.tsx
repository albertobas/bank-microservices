'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteLoanByIdentifierWithDep } from 'src/features/loans/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { identifierSchema } from 'src/shared/utils/constants';

export function DeleteLoanCard(): JSX.Element {
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
    const response = await deleteLoanByIdentifierWithDep(identifier);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Delete a loan</h2>
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
