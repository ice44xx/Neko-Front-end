import { Button } from 'reactstrap';
import styles from './styles.module.scss'
import Link from 'next/link';

export const HeadNoAuth = () => {
    return  (
        <>
            <div className = {styles.ctaSeaction}>
                <p>FEITO COM <img src="/heart.png" alt="" /> E MUITO <img src="/coffe.png" alt="" /> </p>
            </div>
            <div className = {styles.nav}>
                <img src="/logo-two.png" alt="" className = {styles.imgCta} />
                <div className = {styles.containerButton}>
                    <Link href = "/register"><Button className = {styles.button} outline >Fazer Parte</Button></Link>
                    <Link href = "/login"><Button className = {styles.button} outline >Entrar</Button></Link>
                </div>
            </div>
        </>
    )
}

export default HeadNoAuth;