import { BaseSyntheticEvent, PropsWithChildren } from 'react';
import styles from './form.module.css';

type Props = PropsWithChildren & {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

export function Form({ children, onSubmit }: Props): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      {children}
    </form>
  );
}
