import Head from "next/head"
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";
import CardSection from "@/components/homeNoAuth/cardsSection";

const HomeNoAuth = () => {
    return (
        <>
            <Head>
                <title>Neko Animes</title>
                <link rel="shortcut icon" href="/coffe.png" type="image/x-icon" />
                <meta property="og:title" content="Neko Animes" key = "title"/>
                <meta name="description" content="" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"></link>
            </Head>
            <main>
                <HeadNoAuth/>
                <CardSection/>
            </main>
        </>
    )
}

export default HomeNoAuth;