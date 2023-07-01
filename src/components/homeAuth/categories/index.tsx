import categoriesService, { CategoryType } from '@/services/categoriesService'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import useSWR from 'swr'
import styles from './styles.module.scss'
import Link from 'next/link'
import withProtect from '@/components/withAuth'

const Categories = () => {
    const { data, error } = useSWR('/categories', categoriesService.getCategories)
    if(!data) return null
    if(error) return error

    return(
    <>  
        <Splide className={styles.mySplide} options={{type: 'loop', perPage: 20, gap: 120, pagination: false, arrows: false}}>
            {data.data.categories?.map((categories: CategoryType) => (
                <SplideSlide key={categories.id}>
                    <div className={styles.container}>
                        <div className={styles.containerName}>
                            <Link href={`/categories/${categories.name}`} className={styles.link}><p>{categories.name}</p></Link>
                        </div>
                    </div>
                </SplideSlide>
            ))}
        </Splide>
    </>
    )
}

export default withProtect (Categories)