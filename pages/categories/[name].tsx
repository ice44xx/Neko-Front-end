import Categories from '@/components/homeAuth/categories'
import styles from '../../src/components/homeNoAuth/slidesAnimes/styles.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import { AnimeType } from "@/services/animesService"
import categoriesService, { CategoryType } from "@/services/categoriesService"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import FooterGeneric from '@/components/common/footerGeneric'
import withProtect from '@/components/withAuth'
import Link from 'next/link'
import LoadingBar from 'react-top-loading-bar'

const CategoriesPage = () => {
    const [category, setCategory] = useState<CategoryType>()
    const [animes, setAnimes] = useState<AnimeType[]>([])
    const [animesAnother, setAnimesAnother] = useState<AnimeType[]>([])
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const { name } = router.query

    const getCategory = async () => {
        if(typeof name !== "string") return
        const res = await categoriesService.getAnimes(name)

        setLoad(true)

        if(res.status === 200) {
            setCategory(res.data)
            setAnimes(res.data?.animes || [])
        }

        setLoading(false)
        setLoad(false)
    }

    const getAnothers = async () => {
        if(typeof name !== "string") return
        const res = await categoriesService.getAnother(name)

        setLoad(true)

        if(res.status === 200) {
            setCategory(res.data)
            setAnimesAnother(res.data?.animes || [])
        }

        setLoading(false)
        setLoad(false)
    }

    useEffect(() => {
        getCategory()
        getAnothers()
    }, [name])

    return (
        <>
            <Head>
                <title>Neko animes - {name}</title>
            </Head>
            <main>
                <LoadingBar progress={loading ? 0 : 100} color="#631dc0" height={3} onLoaderFinished={() => setLoading(false)}/>
                <HeaderAuth/>
                <Categories/>
                <div className={styles.container_master}>
                    <div className={styles.container}>
                        <div className={styles.container_head}>
                            <p className={styles.titleSearch}>Animes de {name}</p>
                        </div>
                        <div className={styles.container_animes}>
                            {(animes || animesAnother) ? (
                                [...animes, ...animesAnother].map((anime) => (
                                    <Link href={`/animes/${anime.name}`} key={anime.id}>
                                        <div className={styles.card}>
                                            {load ? (
                                                <>
                                                    <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                                    <img src={'/assets/play.png'} className={`${styles.play} ${styles.pulse}`}/>
                                                    <img src={anime.thumbnailUrl} className={styles.img} />
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <FooterGeneric/>
            </main>
        </>
    )
}

export default withProtect (CategoriesPage)