import animeService, { AnimeType } from '@/services/animesService';
import styles from '../../../../styles/splideCarousel.module.scss';
import useSWR from 'swr';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';

const SlidesFavorites = () => {
  const { data, error } = useSWR('/favorites', animeService.getFavorites);
  if (!data) return null;
  if (error) return error;

  const favoriteAnimes = data.data?.animes || [];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_head}>
          <p className={styles.barFav}></p>
          <p className={styles.titlePage}>Meus Favoritos</p>
          <img src='/assets/fav.png' alt='Meus favoritos' />
        </div>
        {favoriteAnimes.length > 0 ? (
          <>
            <Splide
              className={styles.mySplide}
              options={{
                gap: 5,
                omitEnd: true,
                width: 1750,
                perPage: 7,
                pagination: false,
                perMove: 1,
                breakpoints: {
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
                  350: {
                    perPage: 2,
                    width: 0
                  },
                  250: {
                    perPage: 1,
                    width: 0
                  }
                }
              }}
            >
              {favoriteAnimes.map((anime: AnimeType) => (
                <SplideSlide className={styles.SplideSlide} key={anime.id}>
                  <Link href={`/animes/${anime.name}`} key={anime.id}>
                    <div key={anime.id} className={styles.slide}>
                      <p className={styles.title}>
                        {anime.name.length > 20 ? `${anime.name.slice(0, 20)}...` : anime.name}
                      </p>
                      <img src={'/assets/play.png'} className={`${styles.play} ${styles.pulse}`} />
                      <img src={anime.thumbnailUrl} alt={anime.name} className={styles.slideImg} />
                    </div>
                  </Link>
                </SplideSlide>
              ))}
            </Splide>
          </>
        ) : (
          <div className={styles.none}>
            <p>Você ainda não tem favoritos.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SlidesFavorites;
