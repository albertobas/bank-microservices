'use client';

import { useState } from 'react';
import { Card } from 'src/app/_components';
import { getAllLoansWithDep } from 'src/features/loans/core/interactors';

export function GetAllLoansCard(): JSX.Element {
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(): Promise<void> {
    const { success, message, ...rest } = await getAllLoansWithDep();
    console.log('RESPONSE:', { success, message, ...rest });
    setMsg(success ? message + ' Check console for more info.' : message);
  }

  return (
    <Card>
      <h2>Get all loans</h2>
      <button onClick={onSubmit}>Submit</button>
      {msg !== null && <p>{msg}</p>}
    </Card>
  );
}
