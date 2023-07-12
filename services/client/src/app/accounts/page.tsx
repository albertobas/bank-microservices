import styles from './page.module.css';
import { CardList } from '../_components';
import {
  CreateAccountCard,
  DeleteAccountCard,
  DepositToAccountCard,
  GetAccountCard,
  GetAllAccountsCard,
  UpdateAccountCard,
  WithdrawFromAccountCard
} from './_components';

export default async function Page(): Promise<JSX.Element> {
  return (
    <div className={styles.container}>
      <CardList>
        <CreateAccountCard />
        <UpdateAccountCard />
        <DeleteAccountCard />
        <DepositToAccountCard />
        <GetAllAccountsCard />
        <GetAccountCard />
        <WithdrawFromAccountCard />
      </CardList>
    </div>
  );
}
