import FooterGeneric from '@/components/common/footerGeneric'
import styles from '../styles/profile.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import UserProfileForm from '@/components/profile/user'
import Head from "next/head"
import { Button } from 'reactstrap'

const Profile = () => {
    return (
        <>
            <Head>
                <title>Neko Animes - Meus Dados</title>
            </Head>
            <HeaderAuth/>
            <main>
                <div className={styles.container}>
                    <div className={styles.containerContent}>
                        <div className={styles.containerLeft}>
                            <div className={styles.containerContentLeft}>
                                <p className={styles.title}>Minha conta</p>
                                <div className={styles.containerBtn}>
                                    <Button className={styles.btn}>Dados Pessoais</Button>
                                    <Button className={styles.btn}>Trocar Senha</Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerRight}>
                            <div className={styles.containerContentRight}>
                                <p className={styles.title}>Alterar Dados</p>
                                <UserProfileForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterGeneric/>
        </>
    )
}

export default Profile