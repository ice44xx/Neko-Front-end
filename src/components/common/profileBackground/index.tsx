import styles from '../../../../styles/profile.module.scss'
import { useState, useEffect } from 'react'
const ProfileBackground = () => {
    const images = ['backgroundProfile2.png', 'backgroundProfile3.png', 'backgroundProfile4.png']
    const [random, setRandom] = useState('')

    useEffect(() => {
        const index = Math.floor((Math.random() * images.length))
        const random = images[index]
        setRandom(random)
    }, [])
    return(
        <>
            <img src={`/assets/${random}`} className={styles.background_img}></img>
        </>
    )
}

export default ProfileBackground