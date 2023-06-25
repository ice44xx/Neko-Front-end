import Head from 'next/head'
import styles from '../styles/register&login.module.scss'
import HeaderGeneric from '@/components/common/headerGeneric'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useRouter } from 'next/router'
import ToastSuccess from '@/components/common/toastSuccess'
import authService from '@/services/authService'
import ToastError from '@/components/common/toastError'

const Login = () => {
    useEffect (() => {
        if(sessionStorage.getItem('nekoanimes-token')) {
            router.push('/home')
        }
    }, [])
    
    const images = ['register.webp', 'register_one.webp', 'register_two.webp', 'register_third.webp']
    const [randomImage, setRandomImage] = useState('')

    useEffect(() => {
        const index = Math.floor(Math.random() * images.length)
        const randomImage = images[index]
        setRandomImage(randomImage)
    }, [])

    const router = useRouter() 
    const [toast, setToast] = useState(false)
    const [color, setColor] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')!.toString()
        const password = formData.get('password')!.toString()

        const attributes = {email, password}

        const { status } = await authService.login(attributes)

        if (status === 200 || status === 201) {
            router.push('/home')
        } else {
            setToast(true)
            setTimeout(() => {setToast(false)}, 1000 * 4)
            setToastMessage('Algo esta incorreto!')
        }
    }

    useEffect(() => {
        const registerSucess = router.query.registred;

        if(registerSucess === 'true') {
            setToast(true)
            setTimeout(() => { setToast(false) }, 1000 * 4)
            setToastMessage('Cadastro feito com sucesso!')
            setColor(true)
        }
    }, [router.query])

    return(
        <>
            <Head>
                <title>Neko Animes - Login</title>
            </Head>
            <main>
                <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Quero fazer Parte' />

                <div className={styles.container}>
                    <div className={styles.containerLeft}>
                        <img src={`/assets/${randomImage}`}/>
                    </div>
                    <div className={styles.containerRight}>
                        <div className={styles.containerRightContent}>
                            <Form onSubmit={handleLogin}>
                                <p className={styles.title}><strong>Login</strong></p>
                                <FormGroup className={styles.formgroup}>
                                    <Label for = 'email' className={styles.label}>E-mail</Label>
                                    <Input required id='email' name='email' type='email' placeholder='Digite seu email' className={styles.inputName}/>
                                </FormGroup>

                                <FormGroup className={styles.formgroup}>
                                    <Label for = 'password' className={styles.label}>Senha</Label>
                                    <Input required maxLength={15} id='password' name='password' type='password' placeholder='Sua senha' className={styles.inputName}/>
                                </FormGroup>

                                <div className={styles.containerBtn}>
                                    <Button className={styles.btn} type='submit'>Entrar</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                {color ? (
                    <ToastSuccess isOpen={toast} message={toastMessage}/>
                ) : (
                    <ToastError isOpen={toast} message={toastMessage} />
                )}
            </main>
        </>
    )
}

export default Login