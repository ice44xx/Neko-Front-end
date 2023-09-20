import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../../styles.module.scss';

interface Close {
  onClose: () => void;
}

const DashBoardInsertUsers: React.FC<Close> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button className={styles.btn} onClick={handleClose}>
          <img src='/assets/fechar.png' alt='fechar' />
        </Button>
        <Form className={styles.form}>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='name' id='name' placeholder=' ' />
            <Label for='name' className={styles.label}>
              Nome
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='username' id='username' placeholder=' ' />
            <Label for='username' className={styles.label}>
              Nickname
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='email' name='email' id='email' placeholder=' ' />
            <Label for='email' className={styles.label}>
              Email
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='date' name='birthday' id='birthday' placeholder=' ' />
            <Label for='birthday' className={styles.label}>
              Data de Nascimento
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='password' name='password' id='password' placeholder=' ' />
            <Label for='password' className={styles.label}>
              Senha
            </Label>
          </FormGroup>
          <Button type='submit'>Criar</Button>
        </Form>
      </div>
    </div>
  );
};
export default DashBoardInsertUsers;
