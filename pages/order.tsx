import styles from '../styles/order.module.scss'
import FooterGeneric from "@/components/common/footerGeneric"
import HeaderAuth from "@/components/homeAuth/headerAuth"
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth"
import withProtect from '@/components/withAuth'
import profileService from '@/services/profileService'
import Head from "next/head"
import React, {useState, useEffect, FormEvent} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Order = () => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        const token = sessionStorage.getItem('nekoanimes-token')
        if(token) {
            setAuth(true)
        }
        profileService.getUser().then((user) => {
            setUser(user.userName)
            setName(user.firstName)
        })
    }, [])

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const data = new FormData(form)

        try {
            const res = await fetch(form.action, {
              method: 'POST',
              body: data,
              headers: {'Accept': 'application/json'},
            });
      
            if (res.ok) {
              MySwal.fire({
                icon: 'success',
                title: 'Pedido enviado!',
                text: 'Obrigado, tentaremos adicionar o mais rápido possível'
              });
              form.reset();
            } else {
              MySwal.fire({
                icon: 'error',
                title: 'Erro ao enviar pedido!',
                text: 'Houve um problema ao enviar seu pedido. Por favor, tente novamente mais tarde.',
              });
            }
        } catch (error) {
            MySwal.fire({
              icon: 'error',
              title: 'Erro ao enviar pedido!',
              text: 'Houve um problema ao enviar seu pedido. Por favor, tente novamente mais tarde.',
            });
        }
    }
    
    return (
        <>
            <Head><title>Neko Animes - pedido</title></Head>
            <main>
                {auth ? (<HeaderAuth/>) : (<HeadNoAuth/>) }
                
                <div className={styles.container_master}>
                    <div className={styles.container}>
                        <div className={styles.container_order}>
                            <p className={styles.alert}>Envie-nos seu anime favorito ou desejado para adicionarmos!</p>
                            <div className={styles.container_form}>
                                <div className={styles.container_title}>
                                    <p className={styles.title}>Neko Pedidos</p>
                                </div>
                                <Form className={styles.form} onSubmit={handleFormSubmit} action={"https://formspree.io/f/xvojgnba"} method='POST'>
                                    <FormGroup className={styles.formgroup}>
                                        <Input value={name} type='text' name='name' id='name' readOnly className={styles.input}></Input>
                                        <Label for='name' className={styles.label}>Nome</Label>
                                    </FormGroup>

                                    <FormGroup className={styles.formgroup}>
                                        <Input value={user} type='text' name='userName' id='userName' readOnly className={styles.input}></Input>
                                        <Label for='userName' className={styles.label}>Nickname</Label>
                                    </FormGroup>

                                    <FormGroup className={styles.formgroup}>
                                        <Input className={styles.input} type='text' name='message' id='message' required placeholder=' '>a</Input>
                                        <Label className={styles.label}>Anime desejado</Label>
                                    </FormGroup>
                                    <Button className={styles.btn} type='submit'>Enviar Pedido</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_background}></div>
                </div>
                

            <FooterGeneric/>
            </main>
        </>
    )
}

export default withProtect (Order)