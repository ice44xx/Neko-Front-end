import HeaderGeneric from '@/components/common/headerGeneric'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import { Form, FormGroup, Label, Input, Button} from 'reactstrap'
import Footer from '@/components/common/footer'

const Register = () => {
    return (
        <>
            <Head>
                <title>Neko Animes - Registro</title>
                <link rel="shortcut icon" href="/footer-cat-two.png" type="image/x-icon" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"></link>
            </Head>
            <main>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero Logar'/>
                <div className={styles.container}>
                    <div className={styles.containerLeft}>
                        <div className={styles.welcome}>
                            <p className={styles.title}>Olá,</p>
                            <p className={styles.desc}>Primeiros passos para se tornar um Neko</p>
                        </div>
                        
                        
                    </div>
                    <div className={styles.containerRight}>
                        <div className={styles.containerRightContent}>
                            <Form>
                                <p className={styles.title}><strong>Crie sua conta</strong></p>
                                <FormGroup className={styles.formgroup}>
                                    <Label for = 'firstName' className={styles.label}>Nome</Label>
                                    <Input required maxLength={15} id='firstName' name='firstName' type='text' placeholder='Qual seu nome?' className={styles.inputName}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for = 'nickName' className={styles.label}>Nick (apelido)</Label>
                                    <Input required maxLength={15} id='nickName' name='nickName' type='text' placeholder='Escolha seu username' className={styles.input} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for = 'email' className={styles.label}>E-mail</Label>
                                    <Input required id='email' name='email' type='email' placeholder='Digite seu email' className={styles.input} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for = 'birthday' className={styles.label}>Data de Nascimento</Label>
                                    <Input required id='birthday' name='birthday' type='date' min='1930-01-01' max='2023-12-31' className={styles.input} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for = 'password' className={styles.label}>Senha</Label>
                                    <Input required id='password' name='password' type='password' placeholder='Digite uma senha' minLength={6} maxnLength={20} className={styles.input} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for = 'password' className={styles.label}>Confirme sua senha</Label>
                                    <Input required id='password' name='password' type='password' placeholder='Confirme sua senha' minLength={6} maxnLength={20} className={styles.input} />
                                </FormGroup>
                                <div className={styles.containerBtn}>
                                    <Button className={styles.btn}>Criar agora</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <img src="/footer-cat-two.png" alt="" className={styles.img} />
                </div>
            </main>
        </>
    )
}

export default Register