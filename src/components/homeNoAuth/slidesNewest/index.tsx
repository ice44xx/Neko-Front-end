import styles from '../../../../styles/splideCarousel.module.scss';
import animeService from '@/services/animesService';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import SplideCarousel from '@/components/common/splide';

const SlidesNewest = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_head}>
          <p className={styles.bar}></p>
          <p className={styles.titlePage}>Animes Lançamentos</p>
        </div>
        <SplideCarousel apiEndPoint='/animes/newest' dataFetch={animeService.getNewestAnimes} />
      </div>
    </>
  );
};

export default SlidesNewest;
