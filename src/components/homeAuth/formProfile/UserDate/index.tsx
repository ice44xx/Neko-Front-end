import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../../styles/profile.module.scss'
import profileService from '@/services/profileService'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ToastSuccess from '@/components/common/toastSuccess'
import ToastError from '@/components/common/toastError'
const UserDate = () => {
    const [color, setColor] = useState(false)
    const [toast, setToast] = useState(true)
    const [message, setMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [created_at, setCreated_at] = useState('')
    const router = useRouter()

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
            setColor(true)
            setMessage('Informações atualizadas!')
            setTimeout(() => {
                setToast(false)
                router.reload()
            }, 3 * 1000)
            
        } else {
            setToast(true)
            setColor(false)
            setMessage('Email já utilizado')
            setTimeout(() => setToast(false), 3 * 1000)
        }
    }
    return(
        <>  
            <Form className={styles.form} onSubmit={handleUpdate}>
                <FormGroup className={styles.formgroup}>
                    <Input onChange={(e) => {setFirstName(e.target.value)}} value={firstName} name='firstName' id='firstName' type='text' placeholder=' ' className={styles.input}></Input>
                    <Label className={styles.label}>Nome</Label>
                </FormGroup>

                <FormGroup className={styles.formgroup}>
                    <Input onChange={(e) => (setUserName(e.target.value))} value={userName} name='userName' id='userName' type='text' placeholder=' ' className={styles.input}></Input>
                    <Label className={styles.label}>Nick</Label>
                </FormGroup>

                <FormGroup className={styles.formgroup}>
                    <Input onChange={(e) => (setEmail(e.target.value))} value={email} name='email' id='email' type='email' placeholder=' ' className={styles.input}></Input>
                    <Label className={styles.label}>Email</Label>
                </FormGroup>

                <Button type='submit' className={styles.btn}>Salvar alterações</Button>

                {color ? (
                    <ToastSuccess isOpen={toast} message={message}/>
                ) : (
                    <ToastError isOpen={toast} message={message}/>
                )}

            </Form>
        </>
    )
}

export default UserDate