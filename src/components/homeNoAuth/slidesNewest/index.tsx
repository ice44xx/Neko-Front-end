import styles from './styles.module.scss'
import useSWR from 'swr'
import animeService, { AnimeType } from '@/services/animesService'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Link from 'next/link';
import { useState } from 'react'


const SlidesNewest = () => {
    const [load, setLoad] = useState(false)
    const { data, error } = useSWR('/animes/newest', animeService.getNewestAnimes)

    if(!data) return null
    if(error) return error
    
    const handleLoadImage = () => {
        setLoad(false)
    }
 
    return(
        <>
            <div className={styles.container}>
                <div className={styles.container_head}>
                    <p className={styles.bar}></p>
                    <p className={styles.titlePage}>Animes Lançamentos</p>
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
                    279: {
                        perPage: 1,
                        width: 0
                    }
                    }}}>

                    {data.data?.map((anime: AnimeType) => (
                        <SplideSlide key={anime.id}>
                            <Link href={`/animes/${anime.name}`}>
                                <div key={anime.id} className={styles.slide}>
                                    {
                                        load ? (
                                            <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                        ) : ( 
                                        <> 
                                            <p className={styles.title}>{anime?.name}</p>
                                            <img src={'/assets/play.png'} className={styles.play}/>
                                            <img src={anime.thumbnailUrl} alt={anime.name} className={styles.slideImg} onLoad={handleLoadImage}/>
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

export default SlidesNewest