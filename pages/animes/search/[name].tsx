import Head from 'next/head';
import styles from '../../../src/components/homeNoAuth/slidesAnimes/styles.module.scss'
import HeaderAuth from '@/components/homeAuth/headerAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import animeService, { AnimeType } from '@/services/animesService';
import FooterGeneric from '@/components/common/footerGeneric';
import Categories from '@/components/homeAuth/categories';
import HeadNoAuth from '@/components/homeNoAuth/headerNoAuth';
import Link from 'next/link';

const SearchPage = () => {
    const router = useRouter()
    const searchName = router.query.name
    const [searchResult, setSearchResult] = useState<AnimeType[]>([]);
    const [load, setLoad] = useState(false)
    const [auth, setAuth] = useState(false)
    
    const searchAnime = async () => {
        if (typeof searchName === 'string') {
            const res = await animeService.getSearch(searchName);
            setSearchResult(res)
        }
    }

    useEffect(() => {
        if(sessionStorage.getItem('nekoanimes-token')) {
            setAuth(true)
        } else {
            setAuth(false)
        }
        searchAnime()
    }, [searchName])

    const handleLoadImage = () => {
        setLoad(false)
    }

  return (
    <>
        <Head>
            <title>Neko Animes - {searchName}</title>
        </Head>
        <main>
            {auth ? (
                <>
                    <HeaderAuth/>
                    <Categories/>
                </>
            ) : (
                <HeadNoAuth/>
            )}

            <div className={styles.container_master}>
                <div className={styles.container}>
                    <div className={styles.container_head}>
                        <p className={styles.titleSearch}>Resultado da pesquisa {searchName}</p>
                    </div>
                    <div className={styles.container_animes}>
                        {searchResult?.map((anime) => (
                            <Link href={`/animes/${anime.name}`} key={anime.id}>
                                <div className={styles.card}>
                                {load ? 
                                ( <> <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div> </> ) : 
                                    (<>
                                        <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                        <img src={'/assets/play.png'} className={`${styles.play} ${styles.pulse}`}/>
                                        <img src={anime.thumbnailUrl} alt={anime.name} className={styles.img} onLoad={handleLoadImage}/>
                                    </>)
                                }
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <FooterGeneric/>
        </main>
    </>
  );
};

export default SearchPage;
