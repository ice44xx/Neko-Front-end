import styles from '../../../../styles/splideCarousel.module.scss';
import animeService from '@/services/animesService';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import SplideCarousel from '@/components/common/splide';

const SlidesPopular = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_head}>
          <p className={styles.barPopular}></p>
          <p className={styles.titlePage}>Populares no momento</p>
        </div>
        <SplideCarousel apiEndPoint='/animes/popular' dataFetch={animeService.getAnimePopular} />
      </div>
    </>
  );
};

export default SlidesPopular;
