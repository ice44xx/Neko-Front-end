import HeaderAuth from "@/components/common/headerAuth"
import Head from "next/head"

const Home = () => {
    return (
        <>
            <Head>
                <title>Neko Animes - Home</title>
            </Head>
            <main>
                <HeaderAuth/>
            </main>
        </>
    )
}

export default Home