import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BaseSyntheticEvent } from 'react';
import { Form } from 'src/app/_components';

type Props = {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export function CustomerForm({ onSubmit, register, errors }: Props): JSX.Element {
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label>Identifier</label>
        <input {...register('identifier')} />
        <p>{errors.identifier?.message?.toString()}</p>
      </div>
      <div>
        <label>Derogatory Public Records</label>
        <input {...register('derogatoryPublicRecs')} />
        <p>{errors.derogatoryPublicRecs?.message?.toString()}</p>
      </div>
      <div>
        <label>DTI</label>
        <input {...register('dti')} />
        <p>{errors.dti?.message?.toString()}</p>
      </div>
      <div>
        <label>Inquiries last 6 months</label>
        <input {...register('inquiriesLast6Mths')} />
        <p>{errors.inquiriesLast6Mths?.message?.toString()}</p>
      </div>
      <div>
        <label>FICO</label>
        <input {...register('fico')} />
        <p>{errors.fico?.message?.toString()}</p>
      </div>
      <div>
        <label>Logarithmic annual income</label>
        <input {...register('logAnnualIncome')} />
        <p>{errors.logAnnualIncome?.message?.toString()}</p>
      </div>
      <input type="submit" />
    </Form>
  );
}
