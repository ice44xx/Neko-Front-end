import HeaderGeneric from '@/components/common/headerRegister&Login'
import styles from '../styles/register&login.module.scss'
import Head from 'next/head'
import { Form, FormGroup, Label, Input, Button} from 'reactstrap'
import FooterGeneric from '@/components/common/footerGeneric'
import {FormEvent, useState, useEffect} from 'react'
import authService from '@/services/authService'
import { useRouter } from 'next/router'
import ToastError from '@/components/common/toastError'
import ReCAPTCHA from 'react-google-recaptcha'
import LoadingBar from 'react-top-loading-bar'

const Register = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const images = ['register.webp', 'register_one.webp', 'register_two.webp', 'register_third.webp']
    const [randomImage, setRandomImage] = useState('')
    const [recaptchaToken, setRecaptchaToken] = useState<String | null>(null);

    useEffect (() => {
        if(sessionStorage.getItem('nekoanimes-token')) {
            router.push('/home')
        }
        const index = Math.floor(Math.random() * images.length)
        const randomImage = images[index]
        setRandomImage(randomImage)

    }, [])

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const firstName = formData.get('firstName')!.toString()
        const userName = formData.get('userName')!.toString()
        const email = formData.get('email')!.toString()
        const birthday = formData.get('birthday')!.toString()
        const password = formData.get('password')!.toString()

        const attributes = {firstName, userName, email, birthday, password, recaptchaToken: recaptchaToken as string}
        const {data, status} = await authService.register(attributes)

        if(status === 201) {
            setTimeout(() => {
                setLoading(false)
                router.push("/login?registred=true")
            }, 1000)
            
        } else if (status === 400) {
            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 1000 * 3)
            setToastMessage(data.message)
            return
        }
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Neko Animes - Registro</title>
            </Head>
            <main>
                <LoadingBar progress={loading ? 0 : 100} color="#631dc0" height={3} onLoaderFinished={() => setLoading(false)}/>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero Logar'/>
                <div className={styles.container}>
                    <div className={styles.containerLeft}>
                        <img src={`/assets/backRegister&Login/${randomImage}`}/>
                    </div>
                    <div className={styles.containerRight}>
                        <div className={styles.containerRightContent}>
                            <Form onSubmit={handleRegister} className={styles.form_register}>
                                <p className={styles.title}><strong>Crie sua conta</strong></p>
                                <FormGroup className={styles.formgroup}>
                                    <Input required maxLength={15} id='firstName' name='firstName' type='text' placeholder=" " className={styles.input}/>
                                    <Label for = 'firstName' className={styles.label}>Nome</Label>
                                </FormGroup>

                                <FormGroup className={styles.formgroup}>
                                    <Input required maxLength={15} id='userName' name='userName' type='text' placeholder=" " className={styles.input} />
                                    <Label for = 'userName' className={styles.label}>Nick</Label>
                                </FormGroup>

                                <FormGroup className={styles.formgroup}>
                                    <Input required id='email' name='email' type='email' placeholder=" " className={styles.input} />
                                    <Label for = 'email' className={styles.label}>E-mail</Label>
                                </FormGroup>

                                <FormGroup className={styles.formgroup}>
                                    <Input required id='birthday' name='birthday' type='date' min='1930-01-01' max='2023-12-31' className={styles.input} />
                                    <Label for = 'birthday' className={styles.label}>Data de Nascimento</Label>
                                </FormGroup>

                                <FormGroup className={styles.formgroup}>
                                    <Input required id='password' name='password' type='password' placeholder=" " minLength={6} maxLength={20} className={styles.input} />
                                    <Label for = 'password' className={styles.label}>Senha</Label>
                                </FormGroup>

                                <div className={styles.containerBtn}>
                                    <Button className={styles.btn} type='submit'>Criar agora</Button>
                                    <ReCAPTCHA onChange={(token) => setRecaptchaToken(token)} sitekey='6Ld5TCYnAAAAADBxkk98tkSVKWeOPezw95o9u6tV' className={styles.recaptcha}/>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <FooterGeneric/>
                <ToastError isOpen={toast} message={toastMessage}/>
            </main>
        </>
    )
}

export default Register