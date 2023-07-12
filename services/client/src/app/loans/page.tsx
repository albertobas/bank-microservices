import styles from './page.module.css';
import { CardList } from '../_components';
import {
  CreateLoanCard,
  DeleteLoanCard,
  GetAllLoansCard,
  GetLoanCard,
  RequestLoanDefaultCard,
  SaveLoanOnChainCard,
  UpdateLoanCard
} from './_components';

export default function Page(): JSX.Element {
  return (
    <div className={styles.container}>
      <CardList>
        <CreateLoanCard />
        <UpdateLoanCard />
        <DeleteLoanCard />
        <GetAllLoansCard />
        <GetLoanCard />
        <RequestLoanDefaultCard />
        <SaveLoanOnChainCard />
      </CardList>
    </div>
  );
}
