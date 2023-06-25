import { Button, Form, Input } from 'reactstrap';
import { useState} from 'react'
import styles from './styles.module.scss'
import Link from 'next/link';

export const HeadNoAuth = () => {
    const [search, setSearch] = useState(true)

    const handleSearch = () => {
        setSearch(!search)
    }

    return  (
        <>
            <div className={styles.Cta}>
                <p>FEITO COM <img src="/assets/heart.png" alt="" className={styles.imgHeart} /> E MUITO <img src="/assets/coffe.png" alt="" className={styles.imgCoffe} /></p>
            </div>
            <div className = {styles.nav}>
                    <Link href='/home'> <img src="/assets/logo.png" alt="" className = {styles.logo} /> </Link>
                    <div className={styles.container}>
                        <img src="/assets/lupa.png" alt="" className={styles.img} onClick={handleSearch} />
                        <div className={styles.containerContent}>
                            <Link href={'/register'}><Button className={styles.register}>Fazer Parte</Button></Link>
                            <Link href={'/login'}><Button className={styles.login}>Entrar</Button></Link>
                        </div>
                        
                    </div>
                </div>
                <div className={`${styles.container_search} ${search ? styles.active : ''}`} id='containerSearch'>
                    <Form className={styles.form}>
                        <Input name='search' type='search' placeholder='Pesquisar...' className={styles.input}></Input>
                    </Form>
                </div>
        </>
    )
}

export default HeadNoAuth;