import styles from './styles.module.scss'
import useSWR from 'swr'
import animeService, { AnimeType } from '@/services/animesService'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Link from 'next/link';
import { useState } from 'react'


const SlidesFeatures = () => {
    const [load, setLoad] = useState(false)
    
    const { data, error } = useSWR('/animes/featured', animeService.getFeaturedAnimes)

    if(!data) return null 
    if(error) return error

    const handleLoadImage = () => {
        setLoad(false)
    }
 
    return(
        <>
            <div className={styles.container}>
                <p className={styles.titlePage}>Top 10 em destaques</p>
                <Splide className={styles.mySplide} options={{omitEnd: true, width: 1980, pagination: false, perPage: 5, perMove: 1, breakpoints: {
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

                    {data.data?.map((anime: AnimeType) => (
                        <SplideSlide className={styles.SplideSlide} key={anime.id}>
                            <Link href={`/animes/${anime.name}`} key={anime.id}>
                                <div key={anime.id} className={styles.slide}>
                                    {
                                        load ? (
                                            <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                        ) : ( 
                                        <>
                                            <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                            <img src={'/assets/play.png'} className={styles.play}/>
                                            <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.slideImg} onLoad={handleLoadImage}/>
                                        </>)
                                    }
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default SlidesFeatures