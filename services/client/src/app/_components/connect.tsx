'use client';

import { useConnect } from 'wagmi';
import { useIsMounted } from '../_hooks';
import styles from './connect.module.css';

export function Connect(): JSX.Element {
  const isMounted = useIsMounted();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  return (
    <div>
      {connectors.map((connector) =>
        isMounted ? (
          <button
            className={styles.button}
            disabled={!connector.ready}
            key={connector.id}
            onClick={(): void => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ) : (
          <p key={connector.id}>Loading...</p>
        )
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
}
