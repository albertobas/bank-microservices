'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoanByIdentifierWithDep } from 'src/features/loans/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { identifierSchema } from 'src/shared/utils/constants';

export function GetLoanCard(): JSX.Element {
  const [msg, setMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(identifierSchema)
  });

  const onSubmit = handleSubmit(async ({ identifier }) => {
    const { success, message, ...rest } = await getLoanByIdentifierWithDep(identifier);
    console.log('RESPONSE:', { success, message, ...rest });
    setMsg(success ? message + ' Check console for more info.' : message);
    reset();
  });

  return (
    <Card>
      <h2>Get a loan</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Identifier</label>
          <input {...register('identifier')} />
          <p>{errors.identifier?.message?.toString()}</p>
        </div>
        <input type="submit" />
      </Form>
      {msg !== null && <p>{msg}</p>}
    </Card>
  );
}
