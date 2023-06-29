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
            <div className={styles.container}>
                <div className={styles.welcome}>
                    <p>Bem-vindo {userName} <img src="/assets/catwelcome.png" alt="welcome" className={styles.img} /></p>
                    <hr className={styles.hr} />
                </div>
            </div>
            
        </>
    )
}

export default Welcome