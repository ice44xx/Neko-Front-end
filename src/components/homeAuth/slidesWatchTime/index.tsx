import watchService, { WatchType } from "@/services/watchService";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from '../../homeNoAuth/slidesNewest/styles.module.scss'
import React, { useEffect, useState } from 'react';
import Link from "next/link";

const SlidesWatchTime = () => {
    const [clickedItems, setClickedItems] = useState<WatchType[]>([]);
    const [load, setLoad] = useState(true)

    useEffect(() => {
        // Função para obter os itens clicados ao carregar a página
        const getClickedItems = async () => {
            const res = await watchService.getClickedItems();
            setClickedItems(res);
            setLoad(false)
        };
    
        getClickedItems();
      }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_head}>
                    <p className={styles.barFeatures}></p>
                    <p className={styles.titlePage}>Continuar assistindo...</p> 
                </div>
                <Splide className={styles.mySplide} options={{gap: 80, omitEnd: true, width: 1750, perPage: 7, pagination: false, perMove: 1, breakpoints: {
                    1700: {
                        perPage: 6,
                        width: 1500
                    },
                    1450: {
                        perPage: 5,
                        width: 1250
                    },
                    1250: {
                        perPage: 4,
                        width: 1000
                    },
                    980: {
                        perPage: 3,
                        width: 0
                    },
                    520: {
                        perPage: 3,
                        width: 0
                    },
                    495: {
                        perPage: 3,
                        width: 0
                    },
                    350: {
                        perPage: 2,
                        width: 0
                    },
                    250: {
                        perPage: 1,
                        width: 0
                    }
                    }}}>

                    {clickedItems.map((item, index) => (
                        <SplideSlide key={index} className={styles.SplideSlide}>
                            <Link href={`/animes/${item.name}/${item?.EpisodeId}`}>
                                <div className={styles.videos}>
                                    <div className={styles.background}>
                                        <p className={styles.title}>{`${item.name} - Ep ${item.EpisodeId}`}</p>
                                        <img src={item.thumbnailUrl} alt={item.name} />
                                    </div>
                                    <div>
                                        <iframe src={item.videoUrl} width={250} height={160}></iframe>
                                    </div>
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default SlidesWatchTime