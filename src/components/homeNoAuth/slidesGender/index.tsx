import React from 'react';
import styles from "./style.module.scss"
import Link from 'next/link';

const data = [
    {
        id: 1,
        name: 'Shounen',
        description: 'Shounen são populares e voltadas para o público masculino jovem, repletas de ação e aventura.',
        exemples: ['One Piece', 'Boku no Hero'],
    },
    {
        id: 2,
        name: 'Shoujo',
        description: 'Shoujo são voltadas para o público feminino jovem, explorando temas românticos e emocionais.',
        exemples: ['Attack on Titan', 'Death Note'],
    },
    {
        id: 3,
        name: 'Seinen',
        description: 'Seinen exploram temas mais complexos e profundos, abordando questões sociais e psicológicas.',
        exemples: ['Death Note', 'Attack on Titan']
    },
    {
        id: 4,
        name: 'Josei',
        description: 'Josei exploram temáticas mais maduras e realistas, abordando questões relacionadas à vida adulta',
        exemples: ['Paradise Kiss', 'Nana']
    },
    {
        id: 5,
        name: 'Kodomo',
        description: 'Kodomo é destinada para o público infantil caracterizada por histórias lúdicas e educativas.',
        exemples: ['Pokémon', 'Digimon']
    },
]

const SlideGender = () => {
    return (
        <>
            <p className = {styles.title}>Classificação de animes</p>
            <div className = {styles.container}>
                {data.map((data) => (
                <Link href={`/classification/${data.name}`} style={{textDecoration: 'none', color: '#fff'}} key={data.id}>
                    <div className={`${styles.card} ${styles[`card-${data.id}`]}`}>
                        <p className = {styles.title}>{data.name}</p>
                        <p className = {styles.description}>{data.description}</p>
                        <p className = {styles.example}><span>Exemplos:</span>{data.exemples}</p>
                    </div>
                </Link>
                ))}
            </div>
        </>
    )
}

export default SlideGender