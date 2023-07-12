'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getRequestByIdentifierWithDep } from 'src/features/requests/core/interactors';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { numberSchema } from 'src/shared/utils/constants';

export function GetRequestCard(): JSX.Element {
  const [msg, setMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(numberSchema)
  });

  const onSubmit = handleSubmit(async ({ number }) => {
    const { success, message, ...rest } = await getRequestByIdentifierWithDep(number);
    console.log('RESPONSE:', { success, message, ...rest });
    setMsg(success ? message + ' Check console for more info.' : message);
    reset();
  });

  return (
    <Card>
      <h2>Get a request</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Number</label>
          <input {...register('number')} />
          {errors.number && <p>{errors.number.message?.toString()}</p>}
        </div>
        <input type="submit" />
      </Form>
      {msg !== null && !errors.number && <p>{msg}</p>}
    </Card>
  );
}
