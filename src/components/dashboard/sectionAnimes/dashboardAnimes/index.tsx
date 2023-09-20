import { Button } from 'reactstrap';
import styles from './styles.module.scss';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import animeService from '@/services/animesService';
import DashBoardInsertAnimes from '../dashboardInsertAnimes';
import { useRouter } from 'next/router';
import DashBoardShowAnimes from '../dashboardShowAnimes';
import DashBoardPutAnimes from '../dashboardPutAnimes';

interface AnimeDashboard {
  id: number;
  name: string;
  featured: boolean;
  synopsis?: string;
  thumbnailUrl?: string;
  anothers: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  };
  gender: {
    id: number;
    name: string;
  };
}

const DashBoardAnimes = () => {
  const router = useRouter();
  const [anime, setAnime] = useState(0);
  const [animeId, setAnimeId] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [InsertOpen, setInsertOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [ShowOpen, setShowOpen] = useState(false);

  const { data, error } = useSWR('/dashboard/animes', animeService.dashboard);
  if (!data) return null;
  if (error) return error;

  const InsertAnime = async () => {
    setInsertOpen(!InsertOpen);
  };

  const handleShowAnime = async (id: number) => {
    setAnime(id);
    setShowOpen(!ShowOpen);
  };

  const handleEditAnime = async (id: number) => {
    setAnime(id);
    setEditOpen(!EditOpen);
  };

  const handleDeleteAnime = (id: number) => {
    setAnimeId(id);
    setConfirm(!confirm);
  };

  const handleClose = () => {
    setConfirm(!confirm);
  };

  const handleConfirmDelete = async () => {
    await animeService.delete(animeId);
    setConfirm(false);
    router.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_table}>
        <div className={styles.container_table_items}>
          <Button className={styles.btn} onClick={InsertAnime}>
            Inserir novo anime
          </Button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Em Destaque</th>
                <th>Primeira Categoria</th>
                <th>Segunda Categoria</th>
                <th>Gênero</th>
                <th>Mostrar</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            {data?.data?.map((anime: AnimeDashboard) => (
              <tbody key={anime.id}>
                <tr>
                  <td>{anime.id}</td>
                  <td>{anime.name}</td>
                  <td>{anime.featured ? 'Sim' : 'Não'}</td>
                  <td>{anime.categories.name}</td>
                  <td>{anime.anothers.name}</td>
                  <td>{anime.gender.name}</td>
                  <td>
                    <Button onClick={() => handleShowAnime(anime.id)} className={styles.icons}>
                      Mostrar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => handleEditAnime(anime.id)} className={styles.icons}>
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => handleDeleteAnime(anime.id)} className={styles.icons}>
                      <img src='/assets/fechar.png' alt='excluir' />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className={`${styles.confirm} ${confirm ? styles.active : ''}`}>
          <p>Tem certeza que deseja excluir ?</p>
          <div className={styles.containerBtn}>
            <Button onClick={handleConfirmDelete}>Deletar</Button>
            <Button onClick={handleClose}>Voltar</Button>
          </div>
        </div>
        {InsertOpen && <DashBoardInsertAnimes onClose={InsertAnime} />}
        {ShowOpen && <DashBoardShowAnimes id={anime} onClose={handleShowAnime} />}
        {EditOpen && <DashBoardPutAnimes id={anime} onClose={handleEditAnime} />}
      </div>
    </div>
  );
};
export default DashBoardAnimes;
