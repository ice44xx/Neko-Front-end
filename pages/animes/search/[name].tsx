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
                    <p className={styles.titlePage}>Resultado da pesquisa {searchName}</p>
                    <div className={styles.container_animes}>
                        {searchResult?.map((anime) => (
                            <Link href={`/animes/${anime.name}`}>
                                <div className={styles.card} key={anime.id}>
                                {load ? 
                                ( <> <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div> </> ) : 
                                    (<>
                                        <p className={styles.title}>{anime.name.length > 20 ? `${anime.name.slice(0,20)}...` : anime.name}</p>
                                        <p className={styles.synopsis}>{anime.synopsis}</p>
                                        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${anime.thumbnailUrl}`} alt={anime.name} className={styles.img} onLoad={handleLoadImage}/>
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