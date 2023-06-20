import styles from './styles.module.scss'

const Footer = () => {
    return(
        <>
            <div className={styles.containerImg}>
            <img src="/footer.png" alt="" className={styles.img}/>
                <div className={styles.footer}>
                    <p>Esse site não hospeda nenhum vídeo em seu servidor. Todo o conteúdo é disponibilizado por terceiros não afiliados.</p>
                    <p>© 2023 - Neko Animes - Todos os Direitos Reservados</p>
                    <hr className={styles.hr}/>
                    <div className={styles.containerImgEnd}>
                        <img src="/footer-cat-two.png" alt="" className={styles.imgEnd} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer