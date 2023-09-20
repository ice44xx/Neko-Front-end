import FooterGeneric from '@/components/common/footerGeneric';
import styles from '../../styles/animes.module.scss';
import HeaderAuth from '@/components/homeAuth/headerAuth';
import HeaderNoAuth from '@/components/homeNoAuth/headerNoAuth';
import animeService, { AnimeType } from '@/services/animesService';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';
import Categories from '@/components/homeAuth/categories';
import watchService from '@/services/watchService';
import LoadingBar from 'react-top-loading-bar';

const Animes = () => {
  const router = useRouter();
  const { name } = router.query;

  const [anime, setAnime] = useState<AnimeType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleSeasons, setVisibleSeasons] = useState(new Array(anime?.seasons?.length).fill(true));

  useEffect(() => {
    const token = sessionStorage.getItem('nekoanimes-token');
    if (token) {
      setAuth(true);
    }

    getAnime();
  }, [name]);

  const getAnime = async () => {
    if (typeof name !== 'string') return;

    const res = await animeService.getAnime(name);
    setAnime(res);
    setLoading(false);
  };

  const handleFavoriteAnime = async () => {
    if (typeof anime?.id !== 'number') return;

    if (!favorited) {
      await animeService.favorite(anime.id);
      setFavorited(true);
    } else {
      await animeService.removeFavorite(anime.id);
      setFavorited(false);
    }
  };

  const handleLikeAnime = () => {
    if (typeof anime?.id !== 'number') return;

    if (!liked) {
      animeService.like(anime.id);
      setLiked(true);
    } else {
      animeService.removeLike(anime.id);
      setLiked(false);
    }
  };

  const toggleSeasonVisibility = (index: number) => {
    setVisibleSeasons(prevState => {
      const updatedVisibleSeasons = [...prevState];
      updatedVisibleSeasons[index] = !updatedVisibleSeasons[index];
      return updatedVisibleSeasons;
    });
  };

  const handleClickSave = async (episodeId: number, ordem: number, name: string, videoUrl: string, thumbnailUrl: string) => {
    try {
      const res = await watchService.getClick(episodeId, ordem, name, videoUrl, thumbnailUrl);
      return res;
    } catch (error) {}
  };

  return (
    <>
      <Head>
        <title>Neko Animes - {anime?.name}</title>
      </Head>
      <main>
        <LoadingBar progress={loading ? 0 : 100} color='#631dc0' height={3} onLoaderFinished={() => setLoading(false)} />
        {auth ? (
          <>
            <HeaderAuth />
            <Categories />
          </>
        ) : (
          <HeaderNoAuth />
        )}
        <div className={styles.container_master}>
          <div className={styles.container_anime}>
            <img src='/assets/cat_comment_two.png' alt='' className={styles.cat} />
            <div className={styles.container_thumbnail}>
              {anime?.thumbnailUrl ? <img src={anime.thumbnailUrl} alt={anime?.name} className={styles.thumb} /> : <div>Imagem não disponível</div>}
            </div>
            <div className={styles.container_info}>
              <div className={styles.title}>
                <p>{anime?.name}</p>
              </div>
              <div className={styles.synopsis}>
                <p>{anime?.synopsis}</p>
              </div>
              <div className={styles.container_categories}>
                <div className={styles.container_content_categories}>
                  <Link href={`/categories/${anime?.anothers?.name}`} className={styles.link}>
                    <p className={styles.categories}>{anime?.anothers?.name}</p>
                  </Link>
                  <Link href={`/categories/${anime?.categories?.name}`} className={styles.link}>
                    <p className={styles.categories}>{anime?.categories?.name}</p>
                  </Link>
                  <Link href={`/classification/${anime?.gender?.name}`} className={styles.link}>
                    <p className={styles.categories}>{anime?.gender?.name}</p>
                  </Link>
                </div>
                {auth ? (
                  <div className={styles.like_favorite}>
                    {liked ? (
                      <img onClick={handleLikeAnime} className={styles.img} src='/assets/heart.png' alt='' />
                    ) : (
                      <img onClick={handleLikeAnime} className={styles.img} src='/assets/heart0.png' alt='' />
                    )}
                    {favorited === false ? (
                      <img onClick={handleFavoriteAnime} className={styles.img} src='/assets/star0.png' alt='' />
                    ) : (
                      <img onClick={handleFavoriteAnime} className={styles.img} src='/assets/star.png' alt='' />
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.container_episodes}>
            <div className={styles.container_content}>
              {anime?.seasons && anime.seasons.length > 0 ? (
                <>
                  {anime?.seasons?.map((season, index) => (
                    <div key={season.id}>
                      <Button onClick={() => toggleSeasonVisibility(index)} className={styles.btn}>
                        {season.name.slice(0, 11)}
                        <img src='/assets/arrowBtn.png' alt='' className={styles.arrow} />
                      </Button>
                      <div className={styles.container_stream}>
                        {visibleSeasons[index] &&
                          season?.episodes
                            ?.sort((a, b) => a.episodeOrder - b.episodeOrder)
                            .map(episode => (
                              <div className={styles.container_card_episodes} key={episode.id}>
                                <Link
                                  onClick={() => handleClickSave(episode.id, episode.episodeOrder, anime.name, episode.videoUrl, anime.thumbnailUrl)}
                                  className={styles.card}
                                  href={`/animes/${name}/${episode.id}`}
                                >
                                  <p className={styles.title_card}>{`${
                                    episode.name.length >= 24 ? `${episode.name.slice(0, 24)}...` : episode.name
                                  }`}</p>
                                  <img src={anime?.thumbnailUrl} className={styles.back_img} />
                                </Link>
                              </div>
                            ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className={styles.container_none}>
                  <p className={styles.title}>Ops, ainda não há episódios...</p>
                  <p className={styles.subtitle}>Estamos trabalhando o mais rápido possível para adicionar</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <FooterGeneric />
      </main>
    </>
  );
};

export default Animes;
