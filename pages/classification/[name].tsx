import HeaderAuth from '@/components/homeAuth/headerAuth'
import styles from '../../src/components/homeNoAuth/slidesAnimes/styles.module.scss'
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth"
import { AnimeType } from "@/services/animesService"
import genderService, { GenderType } from "@/services/genderService"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Categories from '@/components/homeAuth/categories'
import FooterGeneric from '@/components/common/footerGeneric'
import Link from 'next/link'
import LoadingBar from 'react-top-loading-bar'
 
const classification = () => {
    const router = useRouter()
    const {name} = router.query
    const [gender, setGender] = useState<GenderType>()
    const [animes, setAnimes] = useState<AnimeType[]>([])
    const [auth, setAuth] = useState(false)
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true);

    const getGender = async () => {
        if(typeof name !== "string") return
        const res = await genderService.getGender(name)

        setLoad(true)

        if(res.status === 200) {
            setGender(res.data)
            setAnimes(res.data?.animes || [])
        }
        setLoading(false)
        setLoad(false)
    }

    useEffect(() => {
        const token = sessionStorage.getItem('nekoanimes-token')
        if(token) {
            setAuth(true)
        } else {
            setAuth(false)
        }
        getGender()
    },[name])

    return (
        <>
            <Head>
                <title>Neko animes - {name}</title>
            </Head>
            <main>
            <LoadingBar progress={loading ? 0 : 100} color="#631dc0" height={3} onLoaderFinished={() => setLoading(false)}/>
                {auth ? <> <HeaderAuth/> <Categories/> </> : <HeaderNoAuth/>}
                <div className={styles.container_master}>
                    <div className={styles.container}>
                        <div className={styles.container_head}>
                            <p className={styles.titleSearch}>Classificação {name}</p>
                        </div>
                        <div className={styles.container_animes}>
                            {animes.map((anime) => (
                                <Link href={`/animes/${anime.name}`} key={anime.id}>
                                    <div className={styles.card}>
                                        {load ? (
                                            <>
                                                <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                            </>
                                        ) : (
                                            <>
                                                <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0, 20)}...` : anime.name}</p>
                                                <img src={'/assets/play.png'} className={`${styles.play} ${styles.pulse}`}/>
                                                <img src={anime.thumbnailUrl} className={styles.img} />
                                            </>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <FooterGeneric/>
            </main>
        </>
    )
}

export default classification