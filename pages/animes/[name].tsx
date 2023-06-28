import styles from './styles.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import HeadNoAuth from '@/components/homeNoAuth/headerNoAuth'
import Head from "next/head"
import { useEffect, useState } from 'react'

const Animes = () => {
    const [auth, setAuth] = useState(false)
    const token = sessionStorage.getItem('nekoanimes-token')
    useEffect(() => {
        if(token) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [])
    
    return (
        <>
            <Head>
                <title></title>
            </Head>
            {auth ? (
                <HeaderAuth/>
            ) : (
                <HeadNoAuth/>
            )}
            <main>
                <div className={styles.container}>

                </div>
            </main>
        </>
    )
}

export default Animes