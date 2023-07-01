import animeService, { AnimeType } from '@/services/animesService'
import styles from '../../homeNoAuth/slidesFeatures/styles.module.scss'
import useSWR from 'swr'
import { Splide, SplideSlide } from '@splidejs/react-splide'

const SlidesFavorites = () => {
    const { data, error } = useSWR('/favorites', animeService.getFavorites)
    if(!data) return null
    if(error) return error
    
    const favoriteAnimes = data.data?.animes || []
    
    return (
        <>  
            <div className={styles.container}>
                <p className={styles.titlePage}>Meus Favoritos</p>
                {favoriteAnimes.length >= 1 ? 
                (
                    <Splide className={styles.mySplide}>
                        <SplideSlide>
                            <div className={styles.nonefav}>{data.data.animes}</div>
                        </SplideSlide>
                    </Splide>
                ) : 
                (
                    <p className={styles.nonefav}><strong>Você ainda não tem favoritos</strong></p>
                )}
            </div>
        </>
    )
}

export default SlidesFavorites