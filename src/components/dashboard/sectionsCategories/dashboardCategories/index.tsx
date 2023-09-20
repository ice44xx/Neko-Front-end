import { Button } from 'reactstrap';
import styles from '../../sectionAnimes/dashboardAnimes/styles.module.scss';
import useSWR from 'swr';
import { CategoryType } from '@/services/categoriesService';
import dashboardService from '@/services/dashboardService';
import { useState } from 'react';

const DashBoardCategories = () => {
  const [currentPage, setCurrentsPage] = useState(1);
  const { data: categoriesData, error } = useSWR('/categories', dashboardService.getCategories);
  if (!categoriesData) return null;
  if (error) return error;

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categoriesData.categories.slice(startIndex, endIndex);

  const totalPages = Math.ceil(categoriesData.categories.length / itemsPerPage);

  const PreviousPage = () => {
    if (currentPage > 1) {
      setCurrentsPage(currentPage - 1);
    }
  };
  const NextPage = () => {
    if (currentPage < totalPages) {
      setCurrentsPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_table}>
        <div className={styles.container_table_items}>
          <Button className={styles.btn}>Inserir Categoria</Button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Categoria</th>
              </tr>
            </thead>
            {currentCategories?.map((categoriesData: CategoryType) => (
              <tbody key={categoriesData.id}>
                <td>{categoriesData.id}</td>
                <td>{categoriesData.name}</td>
              </tbody>
            ))}
          </table>
          <div className={styles.pages}>
            <Button onClick={PreviousPage} disabled={currentPage === 1}>
              Voltar
            </Button>
            <Button onClick={NextPage} disabled={currentPage === totalPages}>
              Proximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoardCategories;
