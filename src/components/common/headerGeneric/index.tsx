import Link from 'next/link'
import styles from './styles.module.scss'
import {Button} from 'reactstrap'

interface props {
    logoUrl: string
    btnUrl: string
    btnContent: string
}

const HeaderGeneric = ({ logoUrl, btnUrl, btnContent }: props) => {
    return(
        <>
            <div className = {styles.nav}>
                <Link href={logoUrl}> <img src="/logo-two.png" alt="" className = {styles.imgCta} /> </Link>
                <div className = {styles.containerButton}>
                    <Link href = {btnUrl}><Button className = {styles.button} outline >{btnContent}</Button></Link>
                </div>
            </div>
        </>
    )
}

export default HeaderGeneric