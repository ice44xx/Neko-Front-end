import styles from './styles.module.scss'
import { AnimeType } from '@/services/animesService';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import SlideCard from '../slideCard';

interface props {
    anime: AnimeType[];
}

const SlideComponent = ({anime}: props) => {
    return(
        <>
            <div>
                <Splide className={styles.mySplide} options={{type: 'loop', perPage: 4, perMove: 1, pagination: true, width: 1450, breakpoints: {
                    1450: {
                        perPage: 3,
                        width: 1150
                    },
                    1125: {
                        width: 1000
                    },
                    1000: {
                        perPage: 2,
                        width: 650
                    },
                    635: {
                        perPage: 1,
                        width: 400
                    }
                    
                }}}>
                    {anime?.map((anime) => (
                        <SplideSlide key={anime.id}>
                            <SlideCard anime={anime}/>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default SlideComponent