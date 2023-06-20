import HeaderGeneric from '@/components/common/headerGeneric'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'

const Register = () => {
    return (
        <>
            <Head>
                <title>Neko Animes - Registro</title>
                <link rel="shortcut icon" href="/CardClass/coffe.png" type="image/x-icon" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"></link>
            </Head>
            <main>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero Logar'/>
            </main>
        </>
    )
}

export default Register