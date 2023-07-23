import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../../styles/profile.module.scss'
import profileService from '@/services/profileService'
import { FormEvent, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import ToastSuccess from '@/components/common/toastSuccess'
import ToastError from '@/components/common/toastError'
import Link from 'next/link'
declare global {
    interface Window {
      kofiWidgetOverlay: any;
    }
  }
const UserEmail = () => {
    const [color, setColor] = useState(false)
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [once, setOnce] = useState(false)
    const [email, setEmail] = useState('')
    const [koi, setKoi] = useState(false)
    const router = useRouter()

    useEffect(() => {
        profileService.getUser().then((user) => {
            setEmail(user.email)
        })

    }, [])

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await profileService.getUpdateUserEmail({email})
        if(res === 200 || res === 201) {
            setToast(true)
            setColor(true)
            setMessage('Informações atualizadas!')
            setTimeout(() => {
                setToast(false)
                sessionStorage.clear()
                router.push('/login')
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
                    <Input onChange={(e) => (setEmail(e.target.value))} value={email} name='email' id='email' type='email' placeholder=' ' className={styles.input}></Input>
                    <Label className={styles.label}>Email</Label>
                </FormGroup>

                <div className={styles.container_submit}>
                    <Button type='submit' className={styles.btn}>Salvar alterações</Button>
                </div>
                
                {color ? (
                    <ToastSuccess isOpen={toast} message={message}/>
                ) : (
                    <ToastError isOpen={toast} message={message}/>
                )}

            </Form>
        </>
    )
}

export default UserEmail