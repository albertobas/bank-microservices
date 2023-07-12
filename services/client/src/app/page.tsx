import styles from './page.module.css';

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>Bank Microservices</h1>
      <p>
        Get started by clicking on one of the sections at the top. You will need to log in to your injected wallet if
        you need to write data on-chain.
      </p>
    </main>
  );
}
