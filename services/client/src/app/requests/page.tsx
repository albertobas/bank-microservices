import styles from './page.module.css';
import { CardList } from '../_components';
import { GetAllRequestsCard, GetRequestCard } from './_components';

export default function Page(): JSX.Element {
  return (
    <div className={styles.container}>
      <CardList>
        <GetAllRequestsCard />
        <GetRequestCard />
      </CardList>
    </div>
  );
}
