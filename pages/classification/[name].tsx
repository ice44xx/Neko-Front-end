import HeaderAuth from '@/components/homeAuth/headerAuth'
import styles from './styles.module.scss'
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth"
import { AnimeType } from "@/services/animesService"
import genderService, { GenderType } from "@/services/genderService"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Categories from '@/components/homeAuth/categories'
import FooterGeneric from '@/components/common/footerGeneric'
 
const classification = () => {
    const router = useRouter()
    const {name} = router.query
    const [gender, setGender] = useState<GenderType>()
    const [animes, setAnimes] = useState<AnimeType[]>([])
    const [load, setLoad] = useState(false)
    const auth = !!sessionStorage.getItem('nekoanimes-token')

    const getGender = async () => {
        if(typeof name !== "string") return
        const res = await genderService.getGender(name)

        setLoad(true)

        if(res.status === 200) {
            setGender(res.data)
            setAnimes(res.data?.animes || [])
        }

        setLoad(false)
    }

    useEffect(() => {
        getGender()
    },[name])

    return (
        <>
            <Head>
                <title>Neko animes - {name}</title>
            </Head>

            <main>
                {auth ? <HeaderAuth/> : <HeadNoAuth/>}
                <Categories/>
                <div className={styles.container}>
                    <p className={styles.titlePageGender}>Categoria {name}</p>
                    <div className={styles.container_animes}>
                        {animes.map((anime) => (
                            <div key={anime.id} className={styles.card}>
                                {load ? (
                                    <>
                                        <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                    </>
                                ) : (
                                    <>
                                        <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0, 20)}...` : anime.name}</p>
                                        <p className={styles.synopsis}>{anime.synopsis}</p>
                                        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} className={styles.img} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <FooterGeneric/>
                </div>
            </main>
        </>
    )
}

export default classification