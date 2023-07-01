import Footer from "@/components/common/footer"
import Categories from "@/components/homeAuth/categories"
import HeaderAuth from "@/components/homeAuth/headerAuth"
import SlidesFavorites from "@/components/homeAuth/slidesFavorites"
import SlidesAnimes from "@/components/homeNoAuth/slidesAnimes"
import SlidesFeatures from "@/components/homeNoAuth/slidesFeatures"
import SlideGender from "@/components/homeNoAuth/slidesGender"
import SlidesNewest from "@/components/homeNoAuth/slidesNewest"
import withProtect from "@/components/withAuth"
import Head from "next/head"

const Home = () => {
    return (
        <>
            <Head>
                <title>Neko Animes - Home</title>
            </Head>
            <main>
                <HeaderAuth/>
                <Categories/>
                <SlidesFavorites/>
                <SlidesNewest/>
                <SlidesAnimes/>
                <SlidesFeatures/>
                <SlideGender/>
                <Footer/>
            </main>
        </>
    )
}

export default withProtect (Home)