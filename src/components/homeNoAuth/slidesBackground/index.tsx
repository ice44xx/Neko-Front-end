import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { EffectFade, Autoplay } from 'swiper';
import useSWR from 'swr';
import backgroundService, { BackgroundType } from '@/services/backgroundService';

const SlidesCarousel = () => {
  const { data, error } = useSWR('/background', backgroundService.getBackground);
  if (!data) return null;
  if (error) return error;
  console.log(data);

  return (
    <Swiper
      slidesPerView={1}
      pagination={false}
      loop={true}
      navigation={false}
      effect={'fade'}
      autoplay={{ delay: 8000, disableOnInteraction: false }}
      centeredSlides={true}
      modules={[EffectFade, Autoplay]}
      className={styles.mySwiper}
    >
      {data.data?.map((img: BackgroundType, index: number) => (
        <SwiperSlide className={styles.slides} key={index}>
          <div className={styles.slide}>
            <img className={styles.img} src={img.background} alt='' />
            <div className={styles.smoke}></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlidesCarousel;
