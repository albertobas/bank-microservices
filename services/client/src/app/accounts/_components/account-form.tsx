import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BaseSyntheticEvent } from 'react';
import { Form } from 'src/app/_components';

type Props = {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export function AccountForm({ onSubmit, register, errors }: Props): JSX.Element {
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label>Number</label>
        <input {...register('number')} />
        <p>{errors.number?.message?.toString()}</p>
      </div>
      <div>
        <label>Customer id</label>
        <input {...register('customerId')} />
        <p>{errors.customerId?.message?.toString()}</p>
      </div>
      <div>
        <label>Type</label>
        <input {...register('type')} />
        <p>{errors.type?.message?.toString()}</p>
      </div>
      <div>
        <label>Currency</label>
        <input {...register('currency')} />
        <p>{errors.currency?.message?.toString()}</p>
      </div>
      <div>
        <label>Balance</label>
        <input {...register('balance')} />
        <p>{errors.balance?.message?.toString()}</p>
      </div>
      <input type="submit" />
    </Form>
  );
}
