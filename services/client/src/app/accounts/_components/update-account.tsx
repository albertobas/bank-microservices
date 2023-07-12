'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateAccountWithDep } from 'src/features/accounts/core/interactors';
import { Account } from 'bank-utils/api/v1/entities';
import { accountSchema } from 'src/shared/utils/constants';
import { AccountForm } from './account-form';
import { Card } from 'src/app/_components';

export function UpdateAccountCard(): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(accountSchema)
  });

  const onSubmit = handleSubmit(async (account) => {
    const response = await updateAccountWithDep(account as Account);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Update an account</h2>
      <AccountForm onSubmit={onSubmit} register={register} errors={errors} />
      {message !== null && <p>{message}</p>}
    </Card>
  );
}
