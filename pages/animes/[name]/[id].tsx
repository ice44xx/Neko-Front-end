import styles from '../../../styles/animes.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth";
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";
import animeService, { AnimeType } from "@/services/animesService";
import seasonsService, { SeasonType } from '@/services/seasonsService';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const AnimeEpisode = () => {
    const router = useRouter()
    const {name, id} = router.query
    const [auth, setAuth] = useState(false)
    const [anime, setAnime] = useState<AnimeType | undefined>()
    const [seasonsList, setSeasonsList] = useState<SeasonType | undefined>()
    const [seasons, setSeasons] = useState<SeasonType[] | undefined>([])
    const episodeId = typeof id === 'string' ? parseInt(id) : undefined;

    useEffect(() => {
        getAnime()
        getSeason()
    },[name, id])

    const getAnime = async () => {
        if(typeof name !== 'string') return
        const res = await animeService.getAnime(name)
        setAnime(res)
    }

    const getSeason = async () => {
        const res = await seasonsService.getSeasons()
        setSeasons(res)
    }

    const filterEpisode = anime?.episodes?.find((episode) => episode.id === episodeId)

    return (
        <>
            <Head>
                <title>{name} - {id}</title>
            </Head>
            <main>
                {auth ? (
                    <HeadNoAuth/>
                ) : (
                    <HeaderAuth/>
                )}
                <div className={styles.container_master}> 
                    <div className={styles.container}>
                        <div className={styles.container_left_right}>
                            <div className={styles.container_left}>
                                <p className={styles.title}>{filterEpisode?.name}</p>
                                <iframe title={filterEpisode?.name} src={filterEpisode?.videoUrl} width={800} height={550} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles.container_right}>
                                <div className={styles.list}>
                                    {seasons?.map((season) => (
                                    <div key={season.id}>
                                        <p>{season.name}</p>
                                        {season.episodes?.map((episode, index) => (
                                        <div className={styles.item_list} key={episode.id}>
                                            <Link className={styles.link} href={`/animes/${name}/${episode.id}`}><p>{index + 1} - {episode.name}</p></Link>
                                        </div>
                                        ))}
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
  };
  
  export default AnimeEpisode;