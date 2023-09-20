import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../../styles.module.scss';
import useSWR from 'swr';
import dashboardService from '@/services/dashboardService';

interface Close {
  onClose: (id: number) => void;
  id: number;
}

const DashBoardShowUsers: React.FC<Close> = ({ id, onClose }) => {
  const { data, error } = useSWR(`${id}`, dashboardService.getByIdUsers);
  if (!data) return null;
  if (error) return error;
  console.log(data);

  const formatarData = (birthday: string) => {
    if (!birthday) return ''; // Se não houver data, retornar uma string vazia
    const dataObj = new Date(birthday);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const dia = String(dataObj.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    return `${dia}-${mes}-${ano}`;
  };

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button className={styles.btn} onClick={handleClose}>
          <img src='/assets/fechar.png' alt='fechar' />
        </Button>
        <Form className={styles.form}>
          <FormGroup className={styles.formgroupPerfil}>
            <Label for='image' className={styles.label}>
              Foto de Perfil
            </Label>
            <div className={styles.container_perfil}>
              <img src={`${data.image ? `${data.image}` : '/assets/footer-cat.png'}`} alt='' className={styles.img} />
            </div>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='name' id='name' placeholder=' ' defaultValue={data?.firstName} />
            <Label for='name' className={styles.label}>
              Nome / ID: {data?.id}
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='username' id='username' placeholder=' ' defaultValue={data?.userName} />
            <Label for='username' className={styles.label}>
              Nickname
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='email' name='email' id='email' placeholder=' ' defaultValue={data?.email} />
            <Label for='email' className={styles.label}>
              Email
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='birthday' id='birthday' placeholder=' ' defaultValue={formatarData(data?.birthday)} />
            <Label for='birthday' className={styles.label}>
              Aniversário
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input
              className={styles.input}
              type='text'
              name='userUpdated'
              id='userUpdated'
              placeholder=' '
              defaultValue={data?.userUpdated ? 'Sim' : 'Não'}
            />
            <Label for='userUpdated' className={styles.label}>
              Trocou de Nick ?
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='role' id='role' placeholder=' ' defaultValue={data?.role} />
            <Label for='role' className={styles.label}>
              Perfil
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='created' id='created' placeholder=' ' defaultValue={data?.createdAt} />
            <Label for='created' className={styles.label}>
              Criado em:
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='updated' id='updated' placeholder=' ' defaultValue={data?.updatedAt} />
            <Label for='updated' className={styles.label}>
              Atualizado em:
            </Label>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
export default DashBoardShowUsers;
