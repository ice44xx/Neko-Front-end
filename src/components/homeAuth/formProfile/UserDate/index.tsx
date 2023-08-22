import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../../../../../styles/profile.module.scss';
import profileService from '@/services/profileService';
import { FormEvent, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ToastSuccess from '@/components/common/toastSuccess';
import ToastError from '@/components/common/toastError';

declare global {
  interface Window {
    kofiWidgetOverlay: any;
  }
}
const UserDate = () => {
  const [color, setColor] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [once, setOnce] = useState(false);
  const [created_at, setCreated_at] = useState('');
  const [koi, setKoi] = useState(false);
  const router = useRouter();

  useEffect(() => {
    profileService.getUser().then(user => {
      setFirstName(user.firstName);
      setUserName(user.userName);
      setCreated_at(user.createdAt);
      setBirthday(user.birthday);
      setOnce(user.userUpdated);
    });
  }, []);
  const formatarData = (birthday: string) => {
    if (!birthday) return ''; // Se não houver data, retornar uma string vazia
    const dataObj = new Date(birthday);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const dia = String(dataObj.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    return `${dia}-${mes}-${ano}`;
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await profileService.getUpdate({ firstName, userName, created_at });
    if (res === 200 || res === 201) {
      setToast(true);
      setColor(true);
      setMessage('Informações atualizadas!');
      setTimeout(() => {
        setToast(false);
        router.reload();
      }, 3 * 1000);
    } else {
      setToast(true);
      setColor(false);
      setMessage('Username já utilizado');
      setTimeout(() => setToast(false), 3 * 1000);
    }
  };

  const handleKoi = () => {
    setKoi(!koi);
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUpdate}>
        {once ? (
          <>
            <p className={styles.attetion}>Quer trocar de nick R$ 4,50</p>
            <p className={styles.attetion}>ATENÇÃO, coloque seu nickname atual no alterar nick</p>
          </>
        ) : (
          <p className={styles.attetion}>Atenção, você possui apenas 1 troca de nickname gratuita</p>
        )}
        <FormGroup className={styles.formgroup}>
          <Input
            onChange={e => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            name='firstName'
            id='firstName'
            type='text'
            placeholder=' '
            className={styles.input}
          ></Input>
          <Label className={styles.label}>Nome</Label>
        </FormGroup>

        <FormGroup className={styles.formgroup}>
          <Input
            onChange={e => {
              setBirthday(e.target.value);
            }}
            value={formatarData(birthday)}
            name='birthday'
            id='birthday'
            type='text'
            disabled
            className={styles.input}
          ></Input>
          <Label className={styles.label}>Data de nascimento</Label>
        </FormGroup>

        <FormGroup className={styles.formgroup}>
          {once ? (
            <Input
              onChange={e => setUserName(e.target.value)}
              disabled
              value={userName}
              name='userName'
              id='userName'
              type='text'
              placeholder=' '
              className={`${styles.input} ${styles.disabled}`}
            ></Input>
          ) : (
            <Input
              onChange={e => setUserName(e.target.value)}
              required
              value={userName}
              name='userName'
              id='userName'
              type='text'
              placeholder=' '
              className={styles.input}
            ></Input>
          )}
          <Label className={styles.label}>Nickname</Label>
        </FormGroup>

        <div className={styles.container_submit}>
          {once ? (
            <Button onClick={handleKoi} className={styles.btn}>
              Alterar Nick
            </Button>
          ) : (
            ''
          )}
          <Button type='submit' className={styles.btn}>
            Salvar alterações
          </Button>
        </div>

        {color ? <ToastSuccess isOpen={toast} message={message} /> : <ToastError isOpen={toast} message={message} />}
      </Form>
      <div className={`${styles.koi} ${koi ? styles.koi_active : ''}`}>
        <p onClick={handleKoi}>
          <img src='/assets/fechar.png' />
        </p>
        <iframe id='kofiframe' src='https://ko-fi.com/nekoanimes/?hidefeed=true&widget=true&embed=true&preview=true' title='nekoanimes'></iframe>
      </div>
    </>
  );
};

export default UserDate;
