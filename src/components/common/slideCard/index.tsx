import styles from './style.module.scss'

const slideCard = () => {
    return (
        <>
            <div className={styles.slide}>
                <img src="" alt="" className={styles.slideImg} />
                <p className={styles.title}></p>
                <p className={styles.description}></p>
            </div>
        </>
    )
}

export default slideCard