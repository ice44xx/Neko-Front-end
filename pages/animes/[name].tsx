import FooterGeneric from '@/components/common/footerGeneric'
import styles from '../../styles/animes.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import HeadNoAuth from '@/components/homeNoAuth/headerNoAuth'
import animeService, { AnimeType } from '@/services/animesService'
import Head from "next/head"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Animes = () => {
    const router = useRouter()
    const { name } = router.query

    const [anime, setAnime] = useState<AnimeType>()
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('nekoanimes-token')
        if(token) {
            setAuth(true)
        }

        getAnime()
        
    }, [name])

    const getAnime = async () => {
        if (typeof name !== 'string') return

        const res = await animeService.getAnime(name)
        setAnime(res)
    }

    const handleFavoriteAnime = async () => {
        if (typeof anime?.id !== 'number') return;
      
        if (!favorited) {
          await animeService.favorite(anime.id);
          setFavorited(true);
          console.log('favorited success');
        } else {
          await animeService.removeFavorite(anime.id);
          setFavorited(false);
          console.log('favorited removed');
        }
    };
 
    //ARRUMAR LOGICA
    const handleLikeAnime = () => {
        if (typeof anime?.id !== 'number') return;

        if (!liked) {
            animeService.like(anime.id);
            alert('LIKED TRUE')
            setLiked(true);
        } else {
            animeService.removeLike(anime.id);
            alert('REMOVED TRUE')
            setLiked(false);
        }
    };
    
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
                                <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime?.thumbnailUrl}`} alt={anime?.name} className={styles.thumb} />
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
                                {liked ? (
                                    <img onClick={handleLikeAnime} className={styles.img} src="/assets/heart.png" alt="" />
                                ): (
                                    <img onClick={handleLikeAnime} className={styles.img} src="/assets/heart0.png" alt="" />
                                )}
                                {favorited === false ? (
                                    <img onClick={handleFavoriteAnime} className={styles.img}src="/assets/star0.png" alt="" />
                                ): (
                                    <img onClick={handleFavoriteAnime} className={styles.img}src="/assets/star.png" alt="" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_episodes}>
                        <div className={styles.container_content}>
                            {anime?.episodes?.map((episode) => (
                                <div className={styles.card}>
                                    <Link href={`/animes/${name}/${episode.id}`}><p className={styles.title}>{episode.name}</p></Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <FooterGeneric/>
            </main>
        </>
    )
}

export default Animes