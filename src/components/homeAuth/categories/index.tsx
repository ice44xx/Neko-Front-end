import categoriesService, { CategoryType } from '@/services/categoriesService'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import useSWR from 'swr'
import styles from './styles.module.scss'
import Link from 'next/link'

const Categories = () => {
    const { data, error } = useSWR('/categories', categoriesService.getCategories)
    if(!data) return null
    if(error) return error

    return(
    <>  
        <Splide className={styles.mySplide} options={{type: 'loop', width: 1980, gap: 120, perPage: 20, perMove: 1, arrows: false, pagination: false}}>
            {data.data.categories?.map((categories: CategoryType) => (
                <SplideSlide>
                    <div className={styles.container}>
                        <div className={styles.containerName} key = {categories.id}>
                            <Link href={`/categories/${categories.name}`} className={styles.link}><p>{categories.name}</p></Link>
                        </div>
                    </div>
                </SplideSlide>
            ))}
        </Splide>
    </>
    )
}

export default Categories