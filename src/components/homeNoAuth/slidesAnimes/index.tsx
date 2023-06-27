import animeService, { AnimeType } from '@/services/animesService'
import styles from './styles.module.scss'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'

const SlidesAnimes = () => {
    const [animeCount, setAnimeCount] = useState(5)
    const [showButton, setShowButton] = useState(true)
    const [load, setLoad] = useState(false)

    const { data, error } = useSWR('/animes', animeService.findAll)

    if(!data) return null
    if(error) return error

    const handleMore = () => {
        setAnimeCount(prevCount => prevCount + 5)
    }

    return(
        <>
            <div className={styles.containerMain}>
                <p className={styles.titlePage}>Todos Animes</p>
                <div className={styles.container}>
                    {data.data?.slice(0, animeCount).map((anime: AnimeType) => (
                        <Link href={`/animes/${anime.name}`}>
                            <div key={anime.id} className={styles.card}>
                                {load ? 
                                ( <> <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div> </> ) : 
                                    (<>
                                        <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                        <p className={styles.synopsis}>{anime.synopsis}</p>
                                        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.img} />
                                    </>)
                                }
                            </div>
                        </Link>
                    ))}
                </div>
                {data.data?.length > 5 && showButton && (
                    <Button onClick={handleMore} className={styles.btn}><img src="/assets/arrowBtn.png"/>MOSTRAR MAIS<img src="/assets/arrowBtn.png" alt="" /></Button>
                )}
            </div>
        </>
    )
}

export default SlidesAnimes
