import animeService, { AnimeType } from '@/services/animesService'
import styles from '../../homeNoAuth/slidesFeatures/styles.module.scss'
import useSWR from 'swr'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Link from 'next/link'

const SlidesFavorites = () => {
    const { data, error } = useSWR('/favorites', animeService.getFavorites)
    if(!data) return null
    if(error) return error
    
    const favoriteAnimes = data.data?.animes || []
    
    return (
        <>
            <div className={styles.container}>
                <p className={styles.titlePage}>Meus Favoritos</p>
                <Splide className={styles.mySplide} options={{omitEnd: true, width: 1980, pagination: false, arrows: false, perPage: 5, perMove: 1, breakpoints: {
                    1650: {
                        perPage: 4,
                        width: 1400
                    },
                    1430: {
                        perPage: 3,
                        width: 1000
                    },
                    1000: {
                        perPage: 2,
                        width: 700
                    },
                    665: {
                        perPage: 1,
                        width: 0
                    }

                    }}}>
                    {favoriteAnimes.length > 0 ? (
                        favoriteAnimes.map((anime: AnimeType) => (
                            <SplideSlide className={styles.SplideSlide} key={anime.id}>
                            <Link href={`/animes/${anime.name}`} key={anime.id}>
                                <div key={anime.id} className={styles.slide}>
                                    <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                    <img src={'/assets/play.png'} className={styles.play}/>
                                    <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.slideImg} />
                                </div>
                            </Link>
                            </SplideSlide>
                        ))
                        ) : (
                        <p className={styles.nonefav}><strong>Você ainda não tem favoritos</strong></p>
                    )}
                </Splide>
            </div>
        </>
    )
}

export default SlidesFavorites