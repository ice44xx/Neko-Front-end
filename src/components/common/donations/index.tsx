import Link from "next/link"
import styles from './styles.module.scss'

const Donations = () => {
    
    return (
        <div className={styles.container}>
            <p>Se você gosta e quer apoiar nosso trabalho e ajudar a mantar o site sempre atualizado e sem anúncios</p>
            <Link href={'https://link.mercadopago.com.br/nekoanimes'} className={styles.link} target="blank">
                <div className={styles.background}>
                    <img src="/assets/head.png" className={styles.head} alt="logo neko animes" />
                    <img src="/assets/body.png" className={styles.body} alt="logo neko animes" />
                    <div className={styles.donation}>
                        <img src="/assets/donations/coffe.gif" className={styles.coffe} alt="" />
                        <p>Apoie a Neko Animes</p>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default Donations