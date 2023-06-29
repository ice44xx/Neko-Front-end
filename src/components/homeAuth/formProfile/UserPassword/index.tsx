import profileService from '@/services/profileService'
import styles from '../style.module.scss'
import {useState, useEffect, FormEvent} from 'react'
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import ToastSuccess from '@/components/common/toastSuccess'
import ToastError from '@/components/common/toastError'
import { useRouter } from 'next/router'

const UserPassword = () => {
    const router = useRouter()
    const [color, setColor] = useState(false)
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        profileService.getUser().then((user) => {
            setPassword(user.password);
            setNewPassword(user.newPassword)
        })
    }, [])
    
    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password === newPassword) {
            setToast(true)
            setColor(false)
            setMessage('Não coloque a mesma senha')
            setTimeout(() => setToast(false), 3 * 1000)
            return
        }
        if (newPassword !== confirmPassword) {
            setToast(true)
            setColor(false)
            setMessage('Senhas diferentes!')
            setTimeout(() => setToast(false), 3 * 1000)
            return
        }
    
        const res = await profileService.passwordUpdate({password, newPassword})
            if(res === 201 || res === 204) {
                setToast(true)
                setColor(true)
                setMessage('Senha alterada!')
                setTimeout(() => setToast(false), 3 * 1000)

                setTimeout(() => {
                    sessionStorage.clear()
                    router.push('/')
                }, 1 * 1000)
            }
            if (res === 400) {
                setToast(true)
                setColor(false)
                setMessage('Senha atual incorreta')
                setTimeout(() => setToast(false), 3 * 1000)
            }
    }
    return (
        <>
            <Form className={styles.form} onSubmit={handleUpdate}>
                <FormGroup>
                    <Label className={styles.label} for='password'>Digite sua senha atual</Label>
                    <Input required className={styles.input} name='password' id='password' type='password' onChange={(e) => {setPassword(e.currentTarget.value)}}></Input>
                </FormGroup>
                <FormGroup>
                    <Label className={styles.label} for='newPassword'>Digite sua nova senha</Label>
                    <Input required className={styles.input} name='newPassword' id='newPassword' type='password' onChange={(e) => {setNewPassword(e.currentTarget.value)}}></Input>
                </FormGroup>
                <FormGroup>
                    <Label className={styles.label} for='confirmPassword'>Digite sua nova senha, novamente</Label>
                    <Input required className={styles.input} name='confirmPassword' id='confirmPassword' type='password' onChange={(e) => {setConfirmPassword(e.currentTarget.value)}}></Input>
                </FormGroup>
                <Button type='submit' className={styles.btn}>Salvar</Button>
                {color ? (
                    <ToastSuccess isOpen={toast} message={message}/>
                ) : (
                    <ToastError isOpen={toast} message={message}/>
                )}
            </Form>
        </>
    )
}

export default UserPassword