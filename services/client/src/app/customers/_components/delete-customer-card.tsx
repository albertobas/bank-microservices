'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteCustomerByIdentifierWithDep } from 'src/features/customers/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { identifierSchema } from 'src/shared/utils/constants';

export function DeleteCustomerCard(): JSX.Element {
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
    const response = await deleteCustomerByIdentifierWithDep(identifier);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Delete a customer</h2>
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
