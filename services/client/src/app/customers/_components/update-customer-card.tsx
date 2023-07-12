'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateCustomerWithDep } from 'src/features/customers/core/interactors';
import { Customer } from 'bank-utils/api/v1/entities';
import { customerSchema } from 'src/shared/utils/constants';
import { CustomerForm } from './customer-form';
import { Card } from 'src/app/_components';

export function UpdateCustomerCard(): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(customerSchema)
  });

  const onSubmit = handleSubmit(async (customer) => {
    const response = await updateCustomerWithDep(customer as Customer);
    console.log('RESPONSE:', response);
    setMessage(response.message);
    reset();
  });

  return (
    <Card>
      <h2>Update a customer</h2>
      <CustomerForm onSubmit={onSubmit} register={register} errors={errors} />
      {message !== null && <p>{message}</p>}
    </Card>
  );
}
