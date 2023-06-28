import FooterGeneric from '@/components/common/footerGeneric'
import styles from '../styles/profile.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth"
import Head from "next/head"
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import profileService from '@/services/profileService'
import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react'
import ToastSuccess from '@/components/common/toastSuccess'
import ToastError from '@/components/common/toastError'

const Profile = () => {
    const [toast, setToast] = useState(false)
    const [color, setColor] = useState(true)
    const [toastMessage, setToastMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('');
    const [created_at, setCreated_at] = useState('')

    useEffect(() => {
        profileService.getUser().then((user) => {
            setFirstName(user.firstName)
            setUserName(user.userName)
            setEmail(user.email)
            setCreated_at(user.createdAt)
            setImage(user.image)
        })
    }, [])


    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await profileService.getUpdate({firstName, userName, email, created_at,})
        if(res === 200 || res === 201) {
            setToast(true)
            setToastMessage('Informações atualizadas')
            setColor(true)
            setTimeout(() => setToast(false), 1000 * 3)
        } else {
            setToast(true)
            setToastMessage('Email já utilizado!')
            setColor(false)
            setTimeout(() => setToast(false), 1000 * 3)
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
        }
    };

    const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          await profileService.getUpdate({ image });
          console.log('Imagem atualizada com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar a imagem:', error);
        }
    };
    
 
    return (
        <>
            <Head>
                <title>Neko Animes - Meus Dados</title>
            </Head>
            <HeaderAuth/>
            <main>
                <div className={styles.container}>
                    <div className={styles.containerContent}>
                        <div className={styles.containerLeft}>
                            <div className={styles.containerContentLeft}>
                                <div className={styles.containerProfileImg}>
                                    <Form onSubmit={handleUpdateProfile}>
                                        <div className={styles.containerImg}>
                                            <img src={image} alt="User profile" />
                                        </div>
                                        <div className={styles.containerFileButton}>
                                            <Input type="file" onChange={handleImageChange} className={styles.input} />
                                            <Button className={styles.btnImg} type='submit'>Salvar img</Button>
                                        </div>
                                    </Form>
                                </div>
                                <p className={styles.title}>Minha conta</p>
                                <div className={styles.containerBtn}>
                                    <Button className={styles.btn}>Dados Pessoais</Button>
                                    <Button className={styles.btn}>Trocar Senha</Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerRight}>
                            <div className={styles.containerContentRight}>
                                {color ? (
                                    <ToastSuccess isOpen={toast} message={toastMessage}/>
                                ) : (
                                    <ToastError isOpen={toast} message={toastMessage}/>
                                )}
                                <p className={styles.title}>Alterar Dados</p>
                                <Form className={styles.form} onSubmit={handleUpdate}>
                                    <FormGroup className={styles.Formgroup}>
                                        <Label className={styles.label}>Nome</Label>
                                        <Input onChange={(e) => {setFirstName(e.target.value)}} value={firstName} name='firstName' id='firstName' type='text' placeholder='Qual nome você quer colocar?' className={styles.input}></Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className={styles.label}>Nick</Label>
                                        <Input onChange={(e) => (setUserName(e.target.value))} value={userName} name='userName' id='userName' type='text' placeholder='Qual será seu nick?' className={styles.input}></Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className={styles.label}>Email</Label>
                                        <Input onChange={(e) => (setEmail(e.target.value))} value={email} name='email' id='email' type='email' placeholder='Qual o novo email?' className={styles.input}></Input>
                                    </FormGroup>

                                    <Button type='submit' className={styles.btn}>Salvar alterações</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterGeneric/>
        </>
    )
}

export default Profile