import OneSignal from 'react-onesignal';
import { useEffect } from 'react';
import Donations from '@/components/common/donations';
import styles from '../styles/home.module.scss';
import Footer from '@/components/common/footer';
import Categories from '@/components/homeAuth/categories';
import HeaderNoAuth from '@/components/homeAuth/headerAuth';
import SlidesFavorites from '@/components/homeAuth/slidesFavorites';
import SlidesWatchTime from '@/components/homeAuth/slidesWatchTime';
import SlidesAnimes from '@/components/homeNoAuth/slidesAnimes';
import SlidesFeatures from '@/components/homeNoAuth/slidesFeatures';
import SlideGender from '@/components/homeNoAuth/slidesGender';
import SlidesNewest from '@/components/homeNoAuth/slidesNewest';
import SlidesPopular from '@/components/homeNoAuth/slidesPopular';
import withProtect from '@/components/withAuth';
import Head from 'next/head';
import DonationsKoi from '@/components/common/donationsKoi';
import SlidesCarousel from '@/components/homeNoAuth/slidesBackground';
import Loading from '@/components/common/loading';

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      OneSignal.init({ appId: 'aa62f87b-a179-48a4-b130-7902f61c97b7', allowLocalhostAsSecureOrigin: true });
      OneSignal.showSlidedownPrompt();
    }, 1000 * 4);
  }, []);
  return (
    <>
      <Head>
        <title>Neko Animes - Home</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Loading />
          <HeaderNoAuth />
          <Categories />
          <SlidesCarousel />
          <Donations />
          <DonationsKoi />
          <SlidesWatchTime />
          <SlidesFavorites />
          <SlidesNewest />
          <SlidesPopular />
          <SlidesFeatures />
          <SlidesAnimes />
          <SlideGender />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default withProtect(Home);
