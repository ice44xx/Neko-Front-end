import FooterGeneric from '@/components/common/footerGeneric'
import styles from '../styles/donates.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth"
import Head from "next/head"
import { useState, useEffect } from "react"
import withProtect from '@/components/withAuth'

const Donates = () => {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('nekoanimes-token')
        if(token) {
            setAuth(true)
        }
    }, [])

    return (
        <div>
            <Head><title>Neko Animes - Doação</title></Head>
            <main>
                {auth ? (<HeaderAuth/>) : (<HeadNoAuth/>)}
                <div className={styles.container}>
                    <div className={styles.container_title}>
                        <p className={styles.title}>Neko Doações</p>
                        <img src="/assets/fav.png" alt="" />
                    </div>
                    <div className={styles.container_donate}>
                        <p className={styles.desc}>Se você gosta e quer ajudar a manter a neko animes sempre atualizada e com inovações, não deixe de nos ajudar, ficamos eternamente gratos</p>
                        <p className={styles.alert}><span>ATENÇÃO!</span> O doador ou apoiador está ciente que a doação não pode ser devolvida, você NÃO esta comprando ou adquirindo algo e sim doando para nos ajudar, e como forma de gratidão iremos fazer um memorial no site dos apoiadores </p>
                        <div className={styles.container_master}>
                            <div className={styles.mercado_pago}>
                                <p className={styles.title}>PIX MERCADO PAGO</p>
                                <img src="/assets/qrcode.jfif" alt="" />
                            </div>
                            <div className={styles.bar}></div>
                            <div className={styles.koi_fi}>
                                <p className={styles.title}>NEKO KOI-FI</p>
                            <img src="/assets/qrcode_koi.png" alt="" />
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <p>Caso possua alguma dúvida, ou sugestão entre em contato</p>
                            <p>nekopageanimes@gmail.com</p>
                        </div>
                    </div>
                    <p></p>
                </div>
                <FooterGeneric/>
            </main>
        </div>
    )
}

export default withProtect (Donates)