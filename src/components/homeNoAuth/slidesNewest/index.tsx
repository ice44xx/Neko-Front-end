import styles from './styles.module.scss'
import useSWR from 'swr'
import animeService, { AnimeType } from '@/services/animesService'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Link from 'next/link';
import { useState, useEffect } from 'react'


const SlidesNewest = () => {
    const [load, setLoad] = useState(false)
    useEffect(() => {
        if(!data) {
            setLoad(true)
        }
        data
        setLoad(false)
    })
    
    const { data, error } = useSWR('/animes/newest', animeService.getFeaturedAnimes)

    if(!data) return null
    if(error) return error

    return(
        <>
            <div className={styles.containerMain}>
                <p className={styles.titlePage}>Animes Lançamentos</p>
                <Splide className={styles.mySplide} options={{omitEnd: true, width: 1300, perPage: 5, pagination: false, perMove: 1, breakpoints: {
                    1250: {
                        perPage: 4,
                        width: 1000
                    },
                    980: {
                        perPage: 3,
                        width: 750
                    },
                    750: {
                        perPage: 2,
                        width: 500
                    },
                    520: {
                        perPage: 1,
                        width: 0
                    }

                    }}}>

                    {data.data?.map((anime: AnimeType) => (
                        <SplideSlide key={anime.id}>
                            <div className={styles.slide}>
                                {
                                    load ? (
                                        <div className={styles.load}>Loading...</div>
                                    ) : ( 
                                    <>
                                        <p className={styles.title}>{anime.name}</p>
                                        <p className={styles.synopsis}>{anime.synopsis}</p>
                                        <Link href={`/animes/${anime.id}`}><img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.slideImg} /></Link>
                                    </>)
                                }
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default SlidesNewest