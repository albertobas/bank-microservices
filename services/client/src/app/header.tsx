import Link from 'next/link';
import styles from './header.module.css';
import { pages } from 'src/shared/utils/constants';
import { Connect } from './_components';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link href={pages.HOME.url}>{pages.HOME.title}</Link>
      <Link href={pages.ACCOUNTS.url}>{pages.ACCOUNTS.title}</Link>
      <Link href={pages.CUSTOMERS.url}>{pages.CUSTOMERS.title}</Link>
      <Link href={pages.LOANS.url}>{pages.LOANS.title}</Link>
      <Link href={pages.REQUESTS.url}>{pages.REQUESTS.title}</Link>
      <Connect />
    </header>
  );
}
