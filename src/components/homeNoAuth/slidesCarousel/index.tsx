import styles from './styles.module.scss'
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { EffectFade, Autoplay } from 'swiper';
const SlidesCarousel = () => {
    
    return (
        <Swiper slidesPerView={1} pagination={false} loop={true} navigation={false} effect={'fade'} autoplay={{ delay: 8000, disableOnInteraction: false }} centeredSlides={true} modules={[EffectFade, Autoplay]} className={styles.mySwiper} >
            <SwiperSlide className={styles.slides}>
                <div className={styles.background_one}></div>
            </SwiperSlide>
            <SwiperSlide className={styles.slides}>
                <div className={styles.background_two}></div>
            </SwiperSlide>
            <SwiperSlide className={styles.slides}>
                <div className={styles.background_third}></div>
            </SwiperSlide>
            <SwiperSlide className={styles.slides}>
                <div className={styles.background_four}></div>
            </SwiperSlide>
        </Swiper>
        
    )
}

export default SlidesCarousel