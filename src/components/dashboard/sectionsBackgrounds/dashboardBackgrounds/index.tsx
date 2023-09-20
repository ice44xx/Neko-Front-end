import { Button } from 'reactstrap';
import styles from '../../sectionAnimes/dashboardAnimes/styles.module.scss';
import useSWR from 'swr';
import backgroundService, { BackgroundType } from '@/services/backgroundService';
const DashBoardBackgrounds = () => {
  const { data: backgroundData, error } = useSWR('/backgrounds', backgroundService.getBackground);
  if (!backgroundData) return null;
  if (error) return error;
  console.log(backgroundData);
  return (
    <div className={styles.container}>
      <div className={styles.container_table}>
        <div className={styles.container_table_items}>
          <Button className={styles.btn}>Inserir Plano de fundo</Button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plano de fundo URL</th>
              </tr>
            </thead>
            {backgroundData?.data?.map((backgrounds: BackgroundType, index: number) => (
              <tbody key={index}>
                <td>{index + 1}</td>
                <td>{backgrounds.background}</td>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default DashBoardBackgrounds;
