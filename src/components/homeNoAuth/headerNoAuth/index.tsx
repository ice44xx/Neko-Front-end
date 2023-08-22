import { Button, Form, Input } from 'reactstrap';
import { useState, FormEvent } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const HeaderNoAuth = () => {
  const router = useRouter();
  const [search, setSearch] = useState(true);
  const [searchName, setSearchName] = useState('');

  const handleSearchBarVisible = () => {
    setSearch(!search);
  };
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/animes/search/${searchName}`);
    setSearchName('');
  };

  return (
    <>
      <div className={styles.container_master}>
        <div className={styles.Cta}>
          <p>
            FEITO COM <img src='/assets/heart.png' alt='' className={styles.imgHeart} /> E MUITO{' '}
            <img src='/assets/coffe.png' alt='' className={styles.imgCoffe} />
          </p>
        </div>
        <div className={styles.nav}>
          <Link href='/'>
            {' '}
            <img src='/assets/logo.png' alt='' className={styles.logo} />{' '}
          </Link>
          <div className={styles.container}>
            <img src='/assets/lupa.png' alt='' className={styles.img} onClick={handleSearchBarVisible} />
            <div className={styles.containerContent}>
              <Link href={'/register'}>
                <Button className={styles.register}>Registrar-se</Button>
              </Link>
              <Link href={'/login'}>
                <Button className={styles.login}>Entrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.container_search} ${search ? styles.active : ''}`} id='containerSearch'>
        <Form className={styles.form} onSubmit={handleSearch}>
          <Input
            value={searchName}
            onChange={e => {
              setSearchName(e.currentTarget.value);
            }}
            name='search'
            type='search'
            placeholder='Pesquisar...'
            className={styles.input}
          ></Input>
        </Form>
      </div>
    </>
  );
};

export default HeaderNoAuth;
