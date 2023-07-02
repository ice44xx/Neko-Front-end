import FooterGeneric from '@/components/common/footerGeneric'
import styles from '../../styles/animes.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import HeadNoAuth from '@/components/homeNoAuth/headerNoAuth'
import animeService, { AnimeType } from '@/services/animesService'
import Head from "next/head"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Animes = () => {
    const router = useRouter()
    const { name } = router.query

    const [anime, setAnime] = useState<AnimeType>()
    const [liked, setLiked] = useState(false)
    const [auth, setAuth] = useState(false)

    const getAnime = async () => {
        if(typeof name === 'string') {
            const res = await animeService.getAnime(name)
            setAnime(res)
        }
    }
 
    useEffect(() => {
        const token = sessionStorage.getItem('nekoanimes-token')
        if(token) {
            setAuth(true)
        }

        getAnime()
        
    }, [name])

    const handleLikeAnime = async () => {
        if (typeof anime?.id !== 'number') return;

        if(liked === false) {
            try {
                await animeService.like(anime.id)
                setLiked(true)
                console.log('like sucess')
            } catch (error) {
                console.log('failed to like', error)
            }
        } else {
           try {
             await animeService.removeLike(anime.id)
             setLiked(false)
             console.log('Unlike sucess')

           } catch (error) {
            console.log('Failed to unlike', error)
           }
        }
    } 
    
    return (
        <>
            <Head>
                <title>Neko Animes - {anime?.name}</title>
            </Head>
            <main>
                {auth ? (
                    <HeaderAuth/>
                ) : (
                    <HeadNoAuth/>
                )}
                <div className={styles.container_master}>
                    <div className={styles.container_anime}>
                        <div className={styles.container_thumbnail}>
                            {anime?.thumbnailUrl ? (
                                <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.thumb} />
                                ) : (
                                    <div>Imagem não disponível</div>
                            )}
                        </div>
                        <div className={styles.container_info}>
                            <p className={styles.title}>{anime?.name}</p>
                            <p className={styles.synopsis}>{anime?.synopsis}</p>
                            <div className={styles.container_categories}>
                                <p className={styles.categories}>{anime?.categories?.name}</p>
                                <p className={styles.categories}>{anime?.gender?.name}</p>
                            </div>
                            <div className={styles.like_favorite}>
                                <img onClick={handleLikeAnime} className={styles.img} src="/assets/heart.png" alt="" />
                                <img className={styles.img}src="/assets/star.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_episodes}>
                    
                    </div>
                </div>
                <FooterGeneric/>
            </main>
        </>
    )
}

export default Animes