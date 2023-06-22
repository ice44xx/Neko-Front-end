import Head from "next/head"
import { ReactNode } from "react"
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";
import CardSection from "@/components/homeNoAuth/cardsSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import animeService, { AnimeType } from "@/services/animesService";
import Footer from "@/components/common/footer";

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
                <SlideSection newestAnimes={anime}/>
                <CardSection/>
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