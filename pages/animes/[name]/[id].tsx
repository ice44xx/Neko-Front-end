import FooterGeneric from '@/components/common/footerGeneric';
import styles from '../../../styles/animes.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth";
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";
import animeService, { AnimeType } from "@/services/animesService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import Categories from '@/components/homeAuth/categories';

const AnimeEpisode = () => {
    const router = useRouter()
    const {name, id} = router.query
    const [load, setLoad] = useState(false)
    const [auth, setAuth] = useState(false)
    const [anime, setAnime] = useState<AnimeType>()
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [visibleSeasons, setVisibleSeasons] = useState(new Array(anime?.seasons?.length).fill(true));
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
      setLoad(true)
    }

    const handleEpisodeClick = (episodeId: number) => {
      setSelectedEpisodeId(episodeId);
    };

    const handlePreviousEpisode = () => {
      if (anime && selectedEpisodeId) {
        const episodes = anime.seasons?.flatMap((season) => season.episodes) || [];
        const currentIndex = episodes.findIndex((episode) => episode?.id === selectedEpisodeId);
        if (currentIndex > 0) {
          const previousEpisodeId = episodes[currentIndex - 1]?.id;
          setSelectedEpisodeId(previousEpisodeId);
        }
      }
    };

    const handleNextEpisode = () => {
      if (anime && selectedEpisodeId) {
        const episodes = anime.seasons?.flatMap((season) => season.episodes) || [];
        const currentIndex = episodes.findIndex((episode) => episode?.id === selectedEpisodeId);
        if (currentIndex < episodes.length - 1) {
          const nextEpisodeId = episodes[currentIndex + 1]?.id;
          setSelectedEpisodeId(nextEpisodeId);
        }
      }
    };

    const toggleSeasonVisibility = (index: number) => {
      setVisibleSeasons((prevState) => {
        const updatedVisibleSeasons = [...prevState];
        updatedVisibleSeasons[index] = !updatedVisibleSeasons[index];
        return updatedVisibleSeasons;
      });
    };

    return (
      <>
        <Head>
          <title>{name} - {selectedEpisode?.name}</title>
        </Head>
        <main>
          {auth ? (
            <>
              <HeaderAuth/>
              <Categories/>
            </>
          ) : (
            <HeadNoAuth/>
          )}
          <div className={styles.container_master}> 
            <div className={styles.container}>
              <div className={styles.container_left_right}>
                <div className={styles.container_left}>
                  <p className={styles.title}>{selectedEpisode?.name}</p>
                  <div className={styles.container_stream}>
                    {load ? (
                      <>
                      {selectedEpisode && <iframe className={styles.iframe} allowFullScreen src={selectedEpisode.videoUrl} />}
                      </>
                    ) : (
                      <div className={styles.load}>
                        <img src="/assets/load.gif" alt="" className={styles.img} />
                      </div>
                    )}
                  </div>
                  <div className={styles.container_stream_prev_next}>
                    <Button className={styles.btn} onClick={handlePreviousEpisode}>Voltar episódio</Button>
                    <p></p>
                    <Button className={styles.btn} onClick={handleNextEpisode}>Próximo episódio</Button>
                  </div>
                </div>
                <div className={styles.container_right_img}>
                  <img src="/assets/catcat.gif" alt="" className={styles.cat} />
                  <div className={styles.container_right}>
                    {anime?.seasons?.map((season, index) => (
                      <div key={season.id} className={styles.list}>

                        <div className={styles.container_title}>
                          <Button className={styles.btn_title} onClick={() => toggleSeasonVisibility(index)} ><p className={styles.title}>{season.name.slice(0, 11)}</p></Button>
                          <Button className={styles.btn_arrow} onClick={() => toggleSeasonVisibility(index)}><img src="/assets/arrowBtn.png" alt="" className={styles.arrow} /></Button>
                        </div>
                        
                        {visibleSeasons[index] &&  season.episodes?.sort((a,b) => a.order - b.order).map((episode) => (
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
          </div>
          <FooterGeneric/>
        </main>
      </>
    )
};
  
export default AnimeEpisode;
