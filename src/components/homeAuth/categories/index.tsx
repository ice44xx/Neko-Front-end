import categoriesService, { CategoryType } from '@/services/categoriesService';
import useSWR from 'swr';
import styles from './styles.module.scss';
import Link from 'next/link';
import withProtect from '@/components/withAuth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';

const Categories = () => {
  const { data, error } = useSWR('/categories', categoriesService.getCategories);
  if (!data) return null;
  if (error) return error;

  return (
    <>
      <Swiper
        slidesPerView={9}
        spaceBetween={30}
        loop={true}
        centeredSlides={false}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        className={styles.mySwiper}
      >
        {data.data.categories.map((categories: CategoryType) => (
          <SwiperSlide className={styles.slides} key={categories.id}>
            <div className={styles.containerName}>
              <Link href={`/categories/${categories.name}`} className={styles.link}>
                <p>{categories.name}</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default withProtect(Categories);
