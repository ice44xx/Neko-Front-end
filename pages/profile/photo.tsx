import { Button } from 'reactstrap'
import styles from '../../styles/profile.module.scss'
import Head from "next/head"
import React from 'react'
import Link from 'next/link';
import UserPhoto from '@/components/homeAuth/formProfile/UserPhoto';
import FooterGeneric from '@/components/common/footerGeneric';
import withProtect from '@/components/withAuth';
import HeaderAuth from '@/components/homeAuth/headerAuth';

const Pic = () => {

    return(
        <>
            <Head>
                <title>Neko Animes - Trocar Senha</title>
            </Head>
            <main>
                <HeaderAuth/>
                    <div className={styles.container}>
                        <div className={styles.containerContent}>
                            <div className={styles.containerLeft}>
                                <div className={styles.containerContentLeft}>
                                    <p className={styles.title}>Minha conta</p>
                                    <div className={styles.containerBtn}>
                                        <Link href={'/profile'}><Button className={styles.btn}>Dados Pessoais</Button></Link>
                                        <Link href={'/profile/password'}><Button className={styles.btn}>Trocar Senha</Button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.containerRight}>
                                <div className={styles.containerContentRight}>
                                    <p className={styles.title}>Alterar Foto</p>
                                        <UserPhoto/>
                                </div>
                            </div>
                        </div>
                    </div>
                <FooterGeneric/>
            </main>
        </>
    )
}

export default withProtect (Pic)
