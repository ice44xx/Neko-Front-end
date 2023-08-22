import { Button } from 'reactstrap';
import styles from '../../styles/profile.module.scss';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import FooterGeneric from '@/components/common/footerGeneric';
import withProtect from '@/components/withAuth';
import HeaderAuth from '@/components/homeAuth/headerAuth';
import UserEmail from '@/components/homeAuth/formProfile/UserEmail';

const Email = () => {
  return (
    <>
      <Head>
        <title>Neko Animes - Trocar email</title>
      </Head>
      <main>
        <HeaderAuth />
        <div className={styles.container}>
          <div className={styles.containerContent}>
            <div className={styles.containerLeft}>
              <div className={styles.containerContentLeft}>
                <p className={styles.title}>Minha conta</p>
                <div className={styles.containerBtn}>
                  <Link href={'/profile'}>
                    <Button className={styles.btn}>Dados Pessoais</Button>
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
                <p className={styles.title}>Alterar Email</p>
                <UserEmail />
              </div>
            </div>
          </div>
        </div>
        <FooterGeneric />
      </main>
    </>
  );
};

export default withProtect(Email);
