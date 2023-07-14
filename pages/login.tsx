import Head from 'next/head'
import styles from '../styles/register&login.module.scss'
import HeaderGeneric from '@/components/common/headerRegister&Login'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useRouter } from 'next/router'
import ToastSuccess from '@/components/common/toastSuccess'
import authService from '@/services/authService'
import ToastError from '@/components/common/toastError'
import Link from 'next/link'
import profileService from '@/services/profileService'
import FooterGeneric from '@/components/common/footerGeneric'

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
    const [forgetPassword, setForgetPassword] = useState(false)
    const [codeSent, setCodeSent] = useState(false);
    const [token , setToken] = useState()

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
    const handleSendCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get('emailForget')!.toString()

        const attributes = {email}

        try {
            const res = await authService.reset(attributes)
            if(res.status === 200 || res.status === 201) {
                const token = res.data.token
                setToken(token)
                setCodeSent(true)
            } else {
                return
            }
           
        } catch (error) {
            return error
        }
    }
    const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)

        const code = formData.get('code')!.toString()

        if (code === token) {
            const newPassword = formData.get('newPassword')!.toString()
            const email = formData.get('emailConfirm')!.toString()

            const attributes = {email, newPassword}
            const res = await profileService.resetPassword(attributes)
            if(res.status === 200) {
                router.push('/login')
                    
            } else {
                console.log('Algo esta errado!')
            }
        } else {
            console.log('token invalido')
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

    const handleForgetPassword = () => {
        setForgetPassword(!forgetPassword)
    }

    return(
        <>
            <Head>
                <title>Neko Animes - Login</title>
            </Head>
            <main>
                <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Quero fazer Parte' />
                <div className={styles.container}>
                    <div className={styles.containerLeft}>
                        <img src={`/assets/backRegister&Login/${randomImage}`}/>
                    </div>
                    
                    <div className={styles.containerRight}>
                        <div className={styles.containerRightContent}>
                            <Form onSubmit={handleLogin} className={styles.form}>
                                <p className={styles.title}><strong>Login</strong></p>
                                <FormGroup className={styles.formgroup}>
                                    <Label for = 'email' className={styles.label}>E-mail</Label>
                                    <Input required id='email' name='email' type='email' placeholder='Digite seu email' className={styles.inputName}/>
                                </FormGroup>

                                <FormGroup className={styles.formgroup}>
                                    <Label for = 'password' className={styles.label}>Senha</Label>
                                    <Input required maxLength={15} id='password' name='password' type='password' placeholder='Sua senha' className={styles.inputName}/>
                                </FormGroup>

                                <div className={styles.containerBtnLogin}>
                                    <Button className={styles.btn} type='submit'>Entrar</Button>
                                    <Button onClick={handleForgetPassword} className={styles.btnForget}>Esqueceu a senha?</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    
                    <div className={`${styles.containerForgetPassword} ${forgetPassword ? styles.activeContainer : ''}`}>
                        {codeSent ? 
                        <>
                            <Form className={styles.form} onSubmit={handleConfirm}>
                                <FormGroup>
                                    <Label for='code' className={styles.label}>Insira o código</Label>
                                    <Input type="text" name='code' id='code' className={styles.input} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for='emailConfirm' className={styles.label}>Insira o email novamente</Label>
                                    <Input type="email" name='emailConfirm' id='emailConfirm' className={styles.input} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for='newPassword' className={styles.label}>Nova senha</Label>
                                    <Input type="password" name='newPassword' id='newPassword' className={styles.input}/>
                                </FormGroup>
                                <Button className={styles.btn} type='submit'>Trocar senha</Button>
                            </Form>
                        </> : 
                        <>
                            <div className={styles.title}>
                                <p>Redefinição de senha</p>
                            </div>
                            <Form className={styles.form} onSubmit={handleSendCode}>
                                <FormGroup>
                                    <Label for='emailForget' className={styles.label}>Email</Label>
                                    <Input type="email" name='emailForget' id='emailForget' className={styles.input} />
                                </FormGroup>
                                <Button className={styles.btn} type='submit'>Enviar código</Button>
                            </Form>
                        </>
                        }
                    </div>

                </div>
                {color ? (
                    <ToastSuccess isOpen={toast} message={toastMessage}/>
                ) : (
                    <ToastError isOpen={toast} message={toastMessage} />
                )}
                <FooterGeneric/>
            </main>
        </>
    )
}

export default Login