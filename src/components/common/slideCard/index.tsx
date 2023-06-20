import styles from './style.module.scss'
import { AnimeType } from '@/services/animesService'

interface props {
    anime: AnimeType;
}

const SlideCard = ({anime}: props) => {
    return (
        <>
            <div className={styles.slide}>
                <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.slideImg} />
                <p className={styles.title}>{anime.name}</p>
                <p className={styles.synopsis}>{anime.synopsis}</p>
            </div>
        </>
    )
}

export default SlideCard