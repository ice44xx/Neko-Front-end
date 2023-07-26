import React from 'react';
import styles from "./style.module.scss"
import Link from 'next/link';

const data = [
    {
        id: 1,
        name: 'Shounen',
        description: 'Shounen são populares e voltadas para o público masculino jovem, repletas de ação e aventura.',
        examples: ['"One Piece", ', ' "Boku no Hero"'],
    },
    {
        id: 2,
        name: 'Shoujo',
        description: 'Shoujo são voltadas para o público feminino jovem, explorando temas românticos e emocionais.',
        examples: ['"Fruits Basket", ', ' "Sailor Moon, "'],
    },
    {
        id: 3,
        name: 'Seinen',
        description: 'Seinen exploram temas mais complexos e profundos, abordando questões sociais e psicológicas.',
        examples: ['"Death Note", ', ' "Attack on Titan"']
    },
    {
        id: 4,
        name: 'Josei',
        description: 'Josei exploram temáticas mais maduras e realistas, abordando questões relacionadas à vida adulta',
        examples: ['"Paradise Kiss", ', ' "Nana"']
    },
    {
        id: 5,
        name: 'Kodomo',
        description: 'Kodomo é destinada para o público infantil caracterizada por histórias lúdicas e educativas.',
        examples: ['"Pokémon", ', ' "Digimon"']
    },
]

const SlideGender = () => {
    return (
        <>
            <div className={styles.container_head}>
                <p className={styles.barGender}></p>
                <p className = {styles.titlePage}>Classificações de animes</p>
            </div>
            <div className = {styles.container}>
                {data.map((data) => (
                <Link href={`/classification/${data.name}`} style={{textDecoration: 'none', color: '#fff'}} key={data.id}>
                    <div className={`${styles.card} ${styles[`card-${data.id}`]}`}>
                        <p className = {styles.title}>{data.name}</p>
                        <p className = {styles.description}>{data.description}</p>
                        <p className = {styles.example}><span>Exemplos:</span>{data.examples}</p>
                    </div>
                </Link>
                ))}
            </div>
        </>
    )
}

export default SlideGender