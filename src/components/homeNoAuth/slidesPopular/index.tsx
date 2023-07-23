import styles from '../slidesNewest/styles.module.scss'
import useSWR from 'swr'
import animeService, { AnimeType } from '@/services/animesService'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Link from 'next/link';
import { useState } from 'react'


const SlidesPopular = () => {
    const [load, setLoad] = useState(false)
    
    const { data, error } = useSWR('/animes/popular', animeService.getAnimePopular)

    if(!data) return null 
    if(error) return error

    const handleLoadImage = () => {
        setLoad(false)
    }
 
    return(
        <>
            <div className={styles.container}>
                <div className={styles.container_head}>
                    <p className={styles.barPopular}></p>
                    <p className={styles.titlePage}>Populares no momento</p> 
                </div>
                <Splide className={styles.mySplide} options={{gap: 5, omitEnd: true, width: 1750, perPage: 7, pagination: false, perMove: 1, breakpoints: {
                    1700: {
                        perPage: 6,
                        width: 1500
                    },
                    1450: {
                        perPage: 5,
                        width: 1250
                    },
                    1250: {
                        perPage: 4,
                        width: 1000
                    },
                    980: {
                        perPage: 3,
                        width: 0
                    },
                    520: {
                        perPage: 3,
                        width: 0
                    },
                    495: {
                        perPage: 3,
                        width: 0
                    },
                    375: {
                        perPage: 2,
                        width: 0
                    },
                    250: {
                        perPage: 1,
                        width: 0
                    }
                    }}}>

                    {data.map((anime: AnimeType) => (
                        <SplideSlide className={styles.SplideSlide} key={anime.id}>
                            <Link href={`/animes/${anime.name}`} key={anime.id}>
                                <div key={anime.id} className={styles.slide}>
                                <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                    <img src={'/assets/play.png'} className={`${styles.play} ${styles.pulse}`}/>
                                    <img src={anime.thumbnailUrl} alt={anime?.name} className={styles.slideImg}/>
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default SlidesPopular