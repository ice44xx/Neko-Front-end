import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styles from './style.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
const HeaderAdmin = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(true);
  const Logout = () => {
    sessionStorage.clear();
    router.push('/nekoadmin/login');
  };

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <>
      <div className={styles.navbar}>
        <Link href={'/nekoadmin/dashboard/home'}>
          <img src='/assets/logo.png' alt='' />
        </Link>
        <Button onClick={toggleNavbar} className={styles.btn}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </Button>
      </div>
      <div className={`${styles.navbarOpen} ${navbarOpen ? styles.active : ''}`}>
        <div className={styles.container_navbar}>
          <Button onClick={toggleNavbar} className={styles.btn}>
            <img src='/assets/fechar.png' alt='fechar' className={styles.close} />
          </Button>
          <Link href={'/nekoadmin/dashboard/animes'} className={styles.link}>
            <p>Animes</p>
          </Link>
          <Link href={'/nekoadmin/dashboard/firstcategory'} className={styles.link}>
            <p>Primeira Categoria</p>
          </Link>
          <Link href={'/nekoadmin/dashboard/secondcategory'} className={styles.link}>
            <p>Segunda Categoria</p>
          </Link>
          <Link href={'/nekoadmin/dashboard/seasons'} className={styles.link}>
            <p>Temporadas</p>
          </Link>
          <Link href={'/nekoadmin/dashboard/episodes'} className={styles.link}>
            <p>Episódios</p>
          </Link>
          <Link href={'/nekoadmin/dashboard/backgrounds'} className={styles.link}>
            <p>Planos de fundos</p>
          </Link>
          <Link href={'/nekoadmin/dashboard/users'} className={styles.link}>
            <p>Usuários</p>
          </Link>
          <Button onClick={Logout}>
            <p>Sair</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
