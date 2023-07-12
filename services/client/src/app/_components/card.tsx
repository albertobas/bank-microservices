import { PropsWithChildren } from 'react';
import styles from './card.module.css';

export function Card({ children }: PropsWithChildren): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
