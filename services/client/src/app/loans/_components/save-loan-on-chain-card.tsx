'use client';

import { useNetwork, useContractWrite, type Address } from 'wagmi';
import { useIsMounted } from 'src/app/_hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoanByIdentifierWithDep } from 'src/features/loans/core/interactors';
import loansContractsJson from 'src/generated/loans/contracts.json';
import { stringToBytes32 } from 'src/shared/utils/helpers';
import { Card } from 'src/app/_components';
import { Form } from 'src/app/_components';
import { identifierSchema } from 'src/shared/utils/constants';

export function SaveLoanOnChainCard(): JSX.Element {
  const { chain } = useNetwork();
  const isMounted = useIsMounted();

  return (
    <Card>
      <h2>Save a loan on-chain</h2>
      {isMounted ? (
        typeof chain !== 'undefined' ? (
          <SaveLoanOnChainForm chainId={chain.id} />
        ) : (
          <p>Chain is undefined</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}

function SaveLoanOnChainForm({ chainId }: { chainId: number }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(identifierSchema)
  });

  const { abi, address } =
    loansContractsJson[chainId.toString() as keyof typeof loansContractsJson][0].contracts.LoanManager;
  const { write, data, error, isLoading, isError, isSuccess } = useContractWrite({
    abi,
    address: address as Address,
    functionName: 'addLoan',
    chainId
  });

  const onSubmit = handleSubmit(async ({ identifier }) => {
    const { success, data, message } = await getLoanByIdentifierWithDep(identifier);
    if (success && data !== null) {
      const { identifier, customerId, purpose, intRate, installment, delinquencies2Yrs, isDefault } = data;
      write({
        args: [
          identifier,
          customerId,
          stringToBytes32(purpose),
          stringToBytes32(intRate.toString()),
          stringToBytes32(installment.toString()),
          delinquencies2Yrs,
          isDefault
        ]
      });
    } else {
      console.log(message);
    }
    reset();
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <label>Identifier</label>
          <input {...register('identifier')} />
          <p>{errors.identifier?.message?.toString()}</p>
        </div>
        <input disabled={isLoading} type="submit" />
      </Form>
      {isError && <div>{error?.message}</div>}
      {isSuccess && (
        <div>
          <p>Transaction hash: {data?.hash}</p>
        </div>
      )}
    </>
  );
}
