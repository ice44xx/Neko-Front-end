import { AnimeType } from '@/services/animesService'
import styles from './styles.module.scss'
import SlideComponent from '@/components/common/slidesComponent'
interface props {
    newestAnimes: AnimeType[]
}


const SlideSection = ({newestAnimes}: props) => {
    return (
        <>
            <div>
                <p className={styles.title}>Animes em destaques</p>
                <SlideComponent anime={newestAnimes}/>
            </div>
        </>
    )
}

export default SlideSection