import styles from '../styles/home.module.scss'
import Footer from "@/components/common/footer"
import Categories from "@/components/homeAuth/categories"
import HeaderAuth from "@/components/homeAuth/headerAuth"
import SlidesFavorites from "@/components/homeAuth/slidesFavorites"
import SlidesWatchTime from '@/components/homeAuth/slidesWatchTime'
import SlidesAnimes from "@/components/homeNoAuth/slidesAnimes"
import SlidesFeatures from "@/components/homeNoAuth/slidesFeatures"
import SlideGender from "@/components/homeNoAuth/slidesGender"
import SlidesNewest from "@/components/homeNoAuth/slidesNewest"
import SlidesPopular from '@/components/homeNoAuth/slidesPopular'
import withProtect from "@/components/withAuth"
import Head from "next/head"

const Home = () => {
    return (
        <>
            <Head>
                <title>Neko Animes - Home</title>
            </Head>
            <main>
                <div className={styles.container}>
                    <HeaderAuth/>
                    <Categories/>
                    <SlidesWatchTime/>
                    <SlidesFavorites/>
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

export default withProtect (Home)