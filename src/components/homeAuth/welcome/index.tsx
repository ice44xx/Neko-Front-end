import styles from './styles.module.scss'
import profileService from "@/services/profileService"
import {useState, useEffect} from 'react'

const Welcome = () => {
    const [userName, setUserName] = useState('')
    useEffect(() => {
        profileService.getUser().then((user) => {setUserName(user.userName)})
    }, [])

    return(
        <>
            <p className={styles.welcome}>Bem-vindo {userName}</p>
            <hr className={styles.hr} />
        </>
    )
}

export default Welcome