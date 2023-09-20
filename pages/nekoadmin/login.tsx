import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from './styles.module.scss';
import { FormEvent } from 'react';
import authService from '@/services/authService';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const handleLoginAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();

    const attributes = { email, password };
    const { status } = await authService.loginAdmin(attributes);
    if (status === 200 || status === 201) {
      setTimeout(() => {
        router.push('/nekoadmin/dashboard/home');
      }, 1000);
    } else {
      alert('algo incorreto!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_content}>
        <div className={styles.container_left}>
          <img src='/assets/logo.png' alt='Neko Animes' />
        </div>
        <Form className={styles.form} onSubmit={handleLoginAdmin}>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} name='email' id='email' placeholder=' ' />
            <Label for='email' className={styles.label}>
              Email
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='password' name='password' id='password' placeholder=' ' />
            <Label for='password' className={styles.label}>
              Senha
            </Label>
          </FormGroup>
          <Button type='submit' className={styles.btn}>
            Logar
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
