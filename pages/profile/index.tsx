import FooterGeneric from '@/components/common/footerGeneric';
import styles from '../../styles/profile.module.scss';
import Head from 'next/head';
import { Button } from 'reactstrap';
import React from 'react';
import Link from 'next/link';
import UserDate from '@/components/homeAuth/formProfile/UserDate';
import withProtect from '@/components/withAuth';
import HeaderAuth from '@/components/homeAuth/headerAuth';

const Profile = () => {
  return (
    <>
      <Head>
        <title>Neko Animes - Meus Dados</title>
      </Head>

      <main>
        <HeaderAuth />
        <div className={styles.container}>
          <div className={styles.containerContent}>
            <div className={styles.containerLeft}>
              <div className={styles.containerContentLeft}>
                <p className={styles.title}>Minha conta</p>
                <div className={styles.containerBtn}>
                  <Link href={'/profile/email'}>
                    <Button className={styles.btn}>Trocar Email</Button>
                  </Link>
                  <Link href={'/profile/photo'}>
                    <Button className={styles.btn}>Trocar foto</Button>
                  </Link>
                  <Link href={'/profile/password'}>
                    <Button className={styles.btn}>Trocar Senha</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.containerRight}>
              <div className={styles.containerContentRight}>
                <p className={styles.title}>Alterar Dados</p>
                <UserDate />
              </div>
            </div>
          </div>
        </div>
        <FooterGeneric />
      </main>
    </>
  );
};

export default withProtect(Profile);
