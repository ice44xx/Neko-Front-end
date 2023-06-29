import Categories from '@/components/homeAuth/categories'
import styles from '../classification/styles.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import { AnimeType } from "@/services/animesService"
import categoriesService, { CategoryType } from "@/services/categoriesService"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import FooterGeneric from '@/components/common/footerGeneric'

const CategoriesPage = () => {
    const [category, setCategory] = useState<CategoryType>()
    const [animes, setAnimes] = useState<AnimeType[]>([])
    const [load, setLoad] = useState(false)
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

        setLoad(false)
    }

    useEffect(() => {
        getCategory()
    }, [name])

    

    return (
        <>
            <Head>
                <title>Neko animes - {name}</title>
            </Head>
            <main>
                <HeaderAuth/>
                <Categories/>
                <div className={styles.containerMain}>
                    <p className={styles.titlePage}>Animes de {name}</p>
                    <div className={styles.container}>
                        {animes.map((anime) => (
                            <div key={anime.id} className={styles.card}>
                                {load ? (
                                    <>
                                        <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                    </>
                                ) : (
                                    <>
                                        <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                        <p className={styles.synopsis}>{anime.synopsis}</p>
                                        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} className={styles.img} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <FooterGeneric/>
            </main>
        </>
    )
}

export default CategoriesPage