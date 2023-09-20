import animeService from '@/services/animesService';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import dashboardService from '@/services/dashboardService';
const DashBoardHome = () => {
  const [animes, setAnimes] = useState(0);
  const [users, setUsers] = useState(0);
  const [categories, setCategories] = useState(0);
  const [episodes, setEpisodes] = useState(0);
  const [classifications, setClassifications] = useState(0);

  useEffect(() => {
    countAnimes();
    countUsers();
    countCategories();
    countEpisodes();
    countClassifications();
  });

  const countAnimes = async () => {
    const res = await animeService.dashboard();
    const { data, status } = res;
    if (status === 201 || status === 200) {
      const count = data.length;
      setAnimes(count);
    }
  };
  const countEpisodes = async () => {
    const res = await dashboardService.getEpisodes();
    if (Array.isArray(res)) {
      const count = res.length;
      setEpisodes(count);
    }
  };
  const countCategories = async () => {
    const res = await dashboardService.getCategories();
    const data = res.categories;
    if (Array.isArray(data)) {
      const count = data.length;
      setCategories(count);
    }
  };
  const countClassifications = async () => {
    const res = await dashboardService.getClassifications();
    if (Array.isArray(res)) {
      const count = res.length;
      setClassifications(count);
    }
  };
  const countUsers = async () => {
    const res = await dashboardService.getUsers();
    if (Array.isArray(res)) {
      const count = res.length;
      setUsers(count);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Animes</th>
              <th>Episódios</th>
              <th>Categorias</th>
              <th>Classificações</th>
              <th>Usuários Cadastrados</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{animes}</td>
              <td>{episodes}</td>
              <td>{categories}</td>
              <td>{classifications}</td>
              <td>{users}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DashBoardHome;
