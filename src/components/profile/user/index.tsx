import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'

const UserProfileForm = () => {
    return (
        <>
            <Form className={styles.form}>

                <FormGroup className={styles.Formgroup}>
                    <Label className={styles.label}>Nome</Label>
                    <Input value='name' name='firstName' id='firstName' type='text' placeholder='Qual nome você quer colocar?' className={styles.input}></Input>
                </FormGroup>

                <FormGroup>
                    <Label className={styles.label}>Nick</Label>
                    <Input value='Tsuki Ayu' name='userName' id='userName' type='text' placeholder='Qual será seu nick?' className={styles.input}></Input>
                </FormGroup>

                <FormGroup>
                    <Label className={styles.label}>Email</Label>
                    <Input value='ice44xx@gmail.com' name='email' id='email' type='email' placeholder='Qual será o email?' className={styles.input}></Input>
                </FormGroup>

                <Button className={styles.btn}>Salvar alterações</Button>
                
            </Form>
        </>
    )
}

export default UserProfileForm