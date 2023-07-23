import Link from 'next/link'
import styles from './styles.module.scss'

const Footer = () => {
    return(
        <>
            <div className={styles.containerImg}>
            <img src="/assets/catcatcat.png" alt="" className={styles.img}/>
                <div className={styles.footer}>
                    <p className={styles.desc}>Neko animes não hospeda nenhum vídeo em seu servidor. Todo o conteúdo é disponibilizado por terceiros não afiliados. <br/> <span><img src="/assets/copyright.png" alt="copyright " /> 2023 - Neko Animes - Todos os Direitos Reservados</span></p>
                    <img src="/assets/footer-teste.png" alt="" className={styles.footer_img} />
                    <Link href={'/dmca'} className={styles.link}><p className={styles.dmca}>DMCA</p></Link>
                </div>
            </div>
        </>
    )
}

export default Footer