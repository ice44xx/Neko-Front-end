import Link from 'next/link'
import styles from '../headerAuth/styles.module.scss'
import {useState} from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import profileService from '@/services/profileService'

Modal.setAppElement('#__next')

const HeaderProfileAuth = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(true)
    
    const { data, error } = useSWR('/users/current', profileService.getUser)
    if(!data) return null
    if(error) return error
     

    const handleLogout = () => {
        sessionStorage.clear()
        router.push('/')
    }

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }

    return(
        <>
            <div className={styles.containerMain}>
                <div className = {styles.nav}>
                    <Link href='/home'> <img src="/assets/logo.png" alt="" className = {styles.logo} /> </Link>
                    <div className={styles.container}>
                        <Link href='/home'> <img src="/assets/home_arrow.png" alt="" className = {styles.home_arrow} /> </Link>
                        <div className={styles.containerProfile}>
                            <div className={styles.userName}>
                                <p>{data.userName}</p>
                            </div>
                            <div className={styles.userProfile}>
                                {data.image ? (
                                    <img src={data.image} alt="" className={styles.userImg} onClick={handleModal} />
                                ) : (
                                    <Link href={'/profile/photo'} className={styles.link}><p>Alterar foto</p></Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.modal} ${modalOpen ? styles.activeModal : ''}`}>
                    <Link href='/profile' className={styles.link}><p className={styles.modalLink}>Meus Dados <img src="/assets/user.png" alt="user" className={styles.img} /></p></Link>
                    <Link href={'/'} className={styles.link}><p className={styles.modalLink} onClick={handleLogout}><span>Sair <img src="/assets/logout.png" alt="logout" className={styles.img} /></span></p></Link>
                </div>
            </div>
        </>
    )
}

export default HeaderProfileAuth