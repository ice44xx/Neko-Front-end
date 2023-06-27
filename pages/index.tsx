import Head from "next/head"
import { ReactNode } from "react"
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";

import { GetStaticProps } from "next";
import animeService, { AnimeType } from "@/services/animesService";
import Footer from "@/components/common/footer";
import SlidesNewest from "@/components/homeNoAuth/slidesNewest";
import SlidesFeatures from "@/components/homeNoAuth/slidesFeatures";
import SlideGender from "@/components/homeNoAuth/slidesGender";
import SlidesAnimes from "@/components/homeNoAuth/slidesAnimes";

interface IndexPageProps {
    children?: ReactNode;
    anime: AnimeType[]
}

const HomeNoAuth = ({anime}: IndexPageProps) => {
    return (
        <>
            <Head>
                <title>Neko Animes</title>
                <meta property="og:title" content="Neko Animes" key = "title"/>
                <meta name="description" content="" />
            </Head>
            <main>
                <HeadNoAuth/>
                <SlidesNewest/>
                <SlidesAnimes/>
                <SlidesFeatures/>
                <SlideGender/>
                <Footer/>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await animeService.getNewestAnimes()
    return {
        props: {
            anime: res.data
        },
        revalidate: 3600 * 12
    }
}

export default HomeNoAuth;