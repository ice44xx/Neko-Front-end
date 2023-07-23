import watchService, { WatchType } from "@/services/watchService";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from '../../homeNoAuth/slidesNewest/styles.module.scss'
import React, { useEffect, useState } from 'react';
import Link from "next/link";

const SlidesWatchTime = () => {
    const [clickedItems, setClickedItems] = useState<WatchType[]>([]);
    const [load, setLoad] = useState(true)

    useEffect(() => {
        const getClickedItems = async () => {
            const res = await watchService.getClickedItems();
            setClickedItems(res);
            setLoad(false)
        };
    
        getClickedItems();
    }, []);

    const list = clickedItems.length >= 0 ? clickedItems : [];

      return(
        <>
            {list.length > 0 ? (
                <div className={styles.container}>
                    <div className={styles.container_head}>
                        <p className={styles.bar}></p>
                        <p className={styles.titlePage}>Continuar assistindo...</p>
                    </div>
                    
                    <Splide className={styles.mySplide} options={{gap: 5, omitEnd: true, width: 1750, perPage: 7, pagination: false, perMove: 1, breakpoints: {
                        1700: {
                            perPage: 6,
                            width: 1500
                        },
                        1450: {
                            perPage: 5,
                            width: 1250,
                            gap: 20
                        },
                        1250: {
                            perPage: 4,
                            width: 1000
                        },
                        980: {
                            perPage: 3,
                            width: 0,
                            gap: 10
                        },
                        520: {
                            perPage: 3,
                            width: 0
                        },
                        495: {
                            perPage: 2,
                            width: 0
                        },
                        370: {
                            perPage: 1,
                            width: 0
                        }
                        }}}>

                        {clickedItems.map((item, index) => (
                            <SplideSlide key={index}>
                                <Link href={`/animes/${item.name}/${item.EpisodeId}`}>
                                    <div className={styles.videos}>
                                        {
                                            load ? (
                                                <div className={styles.load}><img src="/assets/load.gif" alt="Carregando..." /></div>
                                            ) : ( 
                                            <> 
                                                <div className={styles.background}>
                                                    <p className={styles.title}>{`${item.name} - Ep ${item.ordem}`}</p>
                                                    <img src={item.thumbnailUrl} alt={item.name} />
                                                </div>
                                                <div className={styles.thumbnail}>
                                                    <img src={'/assets/player_thumb.png'}/>
                                                </div>
                                            </>)
                                        }
                                    </div>
                                </Link>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default SlidesWatchTime