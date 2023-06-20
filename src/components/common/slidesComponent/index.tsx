import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.js'

const slideComponent = () => {
    return(
        <>
            <div>
                <Splide options={{type: 'loop', perPage: 4, perMove: 1, pagination: false}}>
                    <SplideSlide></SplideSlide>
                </Splide>
            </div>
        </>
    )
}

export default slideComponent