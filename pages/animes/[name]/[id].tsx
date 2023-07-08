import FooterGeneric from '@/components/common/footerGeneric';
import styles from '../../../styles/animes.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth";
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";
import animeService, { AnimeType, EpisodesType } from "@/services/animesService";
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from 'reactstrap';

const AnimeEpisode = () => {
    const router = useRouter()
    const {name, id} = router.query
    const [auth, setAuth] = useState(false)
    const [anime, setAnime] = useState<AnimeType>()
    const [episode, setEpisode] = useState<EpisodesType>()
    const episodeId = typeof id === 'string' ? parseInt(id) : undefined;
    const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | undefined>(episodeId);

    const selectedEpisode = anime?.seasons?.flatMap((season) => season.episodes)?.find((episode) => episode?.id === selectedEpisodeId);

    useEffect(() => {
      const token = sessionStorage.getItem('nekoanimes-token')
      if(token) {
        setAuth(true)
      }

      getAnime()
      setSelectedEpisodeId(episodeId);

    },[name, id, episodeId])

    const getAnime = async () => {
      if(typeof name !== 'string') return

      const res = await animeService.getAnime(name)
      setAnime(res)

      if (episodeId && res?.seasons?.length) {
        const episodes = res.seasons[0]?.episodes;
        if (episodes) {
          const episode = episodes.find((ep: EpisodesType) => ep.id === episodeId);
          if (episode) {
            setEpisode(episode)
          }
        }
      }
    }

    const handleEpisodeClick = (episodeId: number) => {
      setSelectedEpisodeId(episodeId);
    };

    return (
      <>
        <Head>
          <title>{name} - {id}</title>
        </Head>
        <main>
          {auth ? (
            <HeaderAuth/>
          ) : (
            <HeadNoAuth/>
          )}
          <div className={styles.container_master}> 
            <div className={styles.container}>
              <div className={styles.container_left_right}>

                <div className={styles.container_left}>
                  <p className={styles.title}>{selectedEpisode?.name}</p>
                  <div className={styles.container_stream}>
                    {selectedEpisode && <iframe allowFullScreen width={700} height={550} src={selectedEpisode.videoUrl} />}
                  </div>
                </div>

                <div className={styles.container_right}>
                  {anime?.seasons?.map((season) => (
                      <div key={season.id} className={styles.list}>
                        <p className={styles.title}>{season.name.slice(0, 11)}</p>
                        {season.episodes?.map((episode) => (
                          <div key={episode.id} className={styles.item_list}>
                            <Button className={styles.btn} onClick={() => handleEpisodeClick(episode.id)}>{episode.name}</Button>
                          </div>
                        ))}
                      </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
          <FooterGeneric/>
        </main>
      </>
    )
};
  
export default AnimeEpisode;


/*
    const [visibleSeasons, setVisibleSeasons] = useState<boolean[]>([]);
    const toggleSeasonVisibility = (index: number) => {
      setVisibleSeasons((prevState) => {
        const updatedVisibleSeasons = [...prevState];
        updatedVisibleSeasons[index] = !updatedVisibleSeasons[index];
        return updatedVisibleSeasons;
      });
    };*/
