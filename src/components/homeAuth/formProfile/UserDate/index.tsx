import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../../styles/profile.module.scss'
import profileService from '@/services/profileService'
import { FormEvent, useEffect, useState } from 'react'
import ToastSuccess from '@/components/common/toastSuccess'
import ToastError from '@/components/common/toastError'

const UserDate = () => {
    const [toast, setToast] = useState(false)
    const [color, setColor] = useState(true)
    const [toastMessage, setToastMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [created_at, setCreated_at] = useState('')

    useEffect(() => {
        profileService.getUser().then((user) => {
            setFirstName(user.firstName)
            setUserName(user.userName)
            setEmail(user.email)
            setCreated_at(user.createdAt)
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
    return(
        <>
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
                
                {color ? (
                        <ToastSuccess isOpen={toast} message={toastMessage}/>
                    ) : (
                        <ToastError isOpen={toast} message={toastMessage}/>
                    )}
            </Form>
        </>
    )
}

export default UserDate