import { Button } from 'reactstrap';
import styles from './styles.module.scss';
import { useState } from 'react';
import DashBoardShowUsers from '../dashboardShowUsers';
import useSWR from 'swr';
import dashboardService from '@/services/dashboardService';
import DashboardDeleteUsers from '../dashboardDeleteUsers';
import handleConfirmDeleteUser from '../dashboardDeleteUsers';
import DashBoardInsertUsers from '../dashboardInsertUsers';
const DashBoardUsers = () => {
  const [confirm, setConfirm] = useState(false);
  const [InsertOpen, setInsertOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [ShowOpen, setShowOpen] = useState(false);
  const [user, setUser] = useState(0);

  const { data: usersData, error } = useSWR('/users', dashboardService.getUsers);
  if (!usersData) return null;
  if (error) return error;
  console.log(usersData);

  const InsertUser = async () => {
    setInsertOpen(!InsertOpen);
  };

  const handleShowUser = async (id: number) => {
    setShowOpen(!ShowOpen);
    setUser(id);
  };

  const handleEditUser = async (id: number) => {
    setEditOpen(!EditOpen);
    setUser(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_table}>
        <div className={styles.container_table_items}>
          <Button className={styles.btn} onClick={InsertUser}>
            Inserir Usuário
          </Button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Username</th>
                <th>Email</th>
                <th>Trocou de nick ?</th>
                <th>Perfil</th>
                <th>Mostrar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            {usersData?.map((user: any) => (
              <tbody>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.userUpdated ? 'Sim' : 'Não'}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button onClick={() => handleShowUser(user.id)}>Mostrar</Button>
                  </td>
                  <td>
                    <img src='/assets/fechar.png' alt='deletar' onClick={() => handleConfirmDeleteUser(user.id)} />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {InsertOpen && <DashBoardInsertUsers onClose={InsertUser} />}
        {ShowOpen && <DashBoardShowUsers id={user} onClose={handleShowUser} />}
      </div>
    </div>
  );
};
export default DashBoardUsers;
