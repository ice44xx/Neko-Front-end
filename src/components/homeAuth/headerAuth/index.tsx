import Link from 'next/link'
import styles from './styles.module.scss'
import {Form, Input} from 'reactstrap'
import {useState} from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import profileService from '@/services/profileService'

Modal.setAppElement('#__next')

const HeaderAuth = () => {
    const router = useRouter()
    const [search, setSearch] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    
    const { data, error } = useSWR('/users/current', profileService.getUser)
    if(!data) return null
    if(error) return error
     

    const handleLogout = () => {
        sessionStorage.clear()
        router.push('/')
    }

    const handleSearch = () => {
        setSearch(!search)
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
                        <img src="/assets/lupa.png" alt="" className={styles.img} onClick={handleSearch} />
                        <div className={styles.userProfile}>
                            {data.image ? (
                                <img src={data.image} alt="" className={styles.userImg} onClick={handleModal} />
                            ) : (
                                <Link href={'/profile/photo'} className={styles.link}><p>Alterar foto</p></Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${styles.container_search} ${search ? styles.active : ''}`} id='containerSearch'>
                    <Form className={styles.form}>
                        <Input name='search' type='search' placeholder='Pesquisar...' className={styles.input}></Input>
                    </Form>
                </div>

                <div className={`${styles.modal} ${modalOpen ? styles.activeModal : ''}`}>
                    <Link href='/profile' className={styles.link}><p className={styles.modalLink}>Meus Dados</p></Link>
                    <Link href={'/'} className={styles.link}><p className={styles.modalLink} onClick={handleLogout}><span>Sair</span></p></Link>
                </div>
            </div>
        </>
    )
}

export default HeaderAuth