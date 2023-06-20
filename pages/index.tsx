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
                <link rel="shortcut icon" href="/footer-cat-two.png" type="image/x-icon" />
                <meta property="og:title" content="Neko Animes" key = "title"/>
                <meta name="description" content="" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"></link>
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