import Link from 'next/link'
import styles from './styles.module.scss'
import {Button} from 'reactstrap'

interface props {
    logoUrl: string
    btnUrl: string
    btnContent: string
}

const HeaderRegisterLogin = ({ logoUrl, btnUrl, btnContent }: props) => {
    return(
        <>
            <div className = {styles.nav}>
                <Link href={logoUrl}> <img src="/assets/logo.png" alt="" className = {styles.logo} /> </Link>
                <div className = {styles.containerButton}>
                    <Link href = {btnUrl}><Button className = {styles.button} outline >{btnContent}</Button></Link>
                </div>
            </div>
        </>
    )
}

export default HeaderRegisterLogin