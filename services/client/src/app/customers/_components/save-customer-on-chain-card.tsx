'use client';

import { useNetwork, useContractWrite, type Address } from 'wagmi';
import { useIsMounted } from 'src/app/_hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCustomerByIdentifierWithDep } from 'src/features/customers/core/interactors';
import customersContractsJson from 'src/generated/customers/contracts.json';
import { stringToBytes32 } from 'src/shared/utils/helpers';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { identifierSchema } from 'src/shared/utils/constants';

export function SaveCustomerOnChainCard(): JSX.Element {
  const { chain } = useNetwork();
  const isMounted = useIsMounted();

  return (
    <Card>
      <h2>Save a customer on-chain</h2>
      {isMounted ? (
        typeof chain !== 'undefined' ? (
          <SaveCustomerOnChainForm chainId={chain.id} />
        ) : (
          <p>Chain is undefined</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}

function SaveCustomerOnChainForm({ chainId }: { chainId: number }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(identifierSchema)
  });

  const { abi, address } =
    customersContractsJson[chainId.toString() as keyof typeof customersContractsJson][0].contracts.CustomerManager;
  const { write, data, error, isLoading, isError, isSuccess } = useContractWrite({
    abi,
    address: address as Address,
    functionName: 'addCustomer',
    chainId
  });

  const onSubmit = handleSubmit(async ({ identifier }) => {
    const { success, data, message } = await getCustomerByIdentifierWithDep(identifier);
    if (success && data !== null) {
      const { identifier, derogatoryPublicRecs, dti, inquiriesLast6Mths, fico, logAnnualIncome } = data;
      write({
        args: [
          identifier,
          derogatoryPublicRecs,
          stringToBytes32(dti.toString()),
          inquiriesLast6Mths,
          stringToBytes32(fico.toString()),
          stringToBytes32(logAnnualIncome.toString())
        ]
      });
    } else {
      console.log(message);
    }
    reset();
  });

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Identifier</label>
          <input {...register('identifier')} />
          <p>{errors.identifier?.message?.toString()}</p>
        </div>
        <input disabled={isLoading} type="submit" />
      </Form>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  );
}
