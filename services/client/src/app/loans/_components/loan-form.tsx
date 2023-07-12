import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BaseSyntheticEvent } from 'react';
import { Form } from 'src/app/_components';

type Props = {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export function LoanForm({ onSubmit, register, errors }: Props): JSX.Element {
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label>Identifier</label>
        <input {...register('identifier')} />
        <p>{errors.identifier?.message?.toString()}</p>
      </div>
      <div>
        <label>Credit policy</label>
        <input {...register('creditPolicy')} />
        <p>{errors.creditPolicy?.message?.toString()}</p>
      </div>
      <div>
        <label>Customer id</label>
        <input {...register('customerId')} />
        <p>{errors.customerId?.message?.toString()}</p>
      </div>
      <div>
        <label>Number of delinquencies in the last 2 years</label>
        <input {...register('delinquencies2Yrs')} />
        <p>{errors.delinquencies2Yrs?.message?.toString()}</p>
      </div>
      <div>
        <label>Days with credit line</label>
        <input {...register('daysWithCreditLine')} />
        <p>{errors.daysWithCreditLine?.message?.toString()}</p>
      </div>
      <div>
        <label>Installment</label>
        <input {...register('installment')} />
        <p>{errors.installment?.message?.toString()}</p>
      </div>
      <div>
        <label>Interest rate</label>
        <input {...register('intRate')} />
        <p>{errors.intRate?.message?.toString()}</p>
      </div>
      <div>
        <label htmlFor="isDefault">Is default?</label>
        <select {...register('isDefault')}>
          <option value="">Choose an option</option>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
        {/* <input {...register('isDefault')} /> */}
        <p>{errors.isDefault?.message?.toString()}</p>
      </div>
      <div>
        <label>Purpose</label>
        <input {...register('purpose')} />
        <p>{errors.purpose?.message?.toString()}</p>
      </div>
      <div>
        <label>Revolving balance</label>
        <input {...register('revolBal')} />
        <p>{errors.revolBal?.message?.toString()}</p>
      </div>
      <div>
        <label>Revolving line utilisation</label>
        <input {...register('revolUtil')} />
        <p>{errors.revolUtil?.message?.toString()}</p>
      </div>
      <input type="submit" />
    </Form>
  );
}
