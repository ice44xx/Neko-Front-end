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
                <p className={styles.title}>Top 10 em destaques</p>
                <div className={styles.container}>
                    <SlideComponent anime={newestAnimes}/>
                </div>
            </div>
        </>
    )
}

export default SlideSection