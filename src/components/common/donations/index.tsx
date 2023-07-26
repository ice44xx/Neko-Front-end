import Link from "next/link"
import styles from './styles.module.scss'

const Donations = () => {

    return (
        <div className={styles.container}>
            <div className={styles.container_content}>
                <p>Gosta de assistir animes aqui? <br/> Ajude-nos doando QUALQUER valor para apoiar á continuar esse projeto <img src="/assets/heartDonate.png" alt="Coração" className={styles.heart} /></p>
                <Link href={'/donates'} className={styles.link}>
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
        </div>
    )
}

export default Donations
