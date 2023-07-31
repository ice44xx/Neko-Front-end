import Head from "next/head"
import styles from '../styles/home.module.scss'
import OneSignal from 'react-onesignal';
import { useEffect } from "react"
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import Footer from "@/components/common/footer";
import SlidesNewest from "@/components/homeNoAuth/slidesNewest";
import SlidesFeatures from "@/components/homeNoAuth/slidesFeatures";
import SlideGender from "@/components/homeNoAuth/slidesGender";
import SlidesAnimes from "@/components/homeNoAuth/slidesAnimes";
import SlidesPopular from "@/components/homeNoAuth/slidesPopular";
import Cookies from "@/components/common/cookies";
import SlidesCarousel from "@/components/homeNoAuth/slidesBackground";
import Loading from "@/components/common/loading";

const HomeNoAuth = () => {
    useEffect (() => {
        setTimeout(() => {
           OneSignal.init({ appId: "aa62f87b-a179-48a4-b130-7902f61c97b7", allowLocalhostAsSecureOrigin: true});
           OneSignal.showSlidedownPrompt();
        }, 1000 * 4)
    }, [])
    return (
        <>
            <Head>
                <title>Neko Animes</title>
                <meta property="og:title" content="Neko Animes" key = "title"/>
                <meta name="description" content="" />
            </Head>
            <main>
                <div className={styles.container}>
                    <Loading/>
                    <HeaderNoAuth/>
                    <Cookies/>
                    <SlidesCarousel/>
                    <SlidesNewest/>
                    <SlidesPopular/>
                    <SlidesFeatures/>
                    <SlidesAnimes/>
                    <SlideGender/>
                    <Footer/>
                </div>
            </main>
        </>
    )
}

export default HomeNoAuth;