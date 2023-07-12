import styles from './page.module.css';
import { CardList } from '../_components';
import {
  CreateCustomerCard,
  DeleteCustomerCard,
  GetAllCustomersCard,
  GetCustomerCard,
  SaveCustomerOnChainCard,
  UpdateCustomerCard
} from './_components';

export default function Page(): JSX.Element {
  return (
    <div className={styles.container}>
      <CardList>
        <CreateCustomerCard />
        <UpdateCustomerCard />
        <DeleteCustomerCard />
        <GetAllCustomersCard />
        <GetCustomerCard />
        <SaveCustomerOnChainCard />
      </CardList>
    </div>
  );
}
