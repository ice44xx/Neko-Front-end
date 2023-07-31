import styles from '../../../../styles/splideCarousel.module.scss'
import animeService from '@/services/animesService'
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import SplideCarousel from '@/components/common/splide';


const SlidesFeatures = () => {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.container_head}>
                    <p className={styles.barFeatures}></p>
                    <p className={styles.titlePage}>Top 10 em destaques</p> 
                </div>
                <SplideCarousel apiEndPoint='/animes/featured' dataFetch={animeService.getFeaturedAnimes}/>
            </div>
        </>
    )
}

export default SlidesFeatures