import { PropsWithChildren } from 'react';
import styles from './card-list.module.css';

export function CardList({ children }: PropsWithChildren): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
