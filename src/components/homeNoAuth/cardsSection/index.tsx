import React from 'react';
import styles from "./style.module.scss"

const CardSection = () => {
    return (
        <>
            <p className = {styles.title}>Classificação de animes</p>
            <div className = {styles.container}>
                <div className = {styles.cardOne}>
                    <p className = {styles.titleCard}>Shounen</p>
                    <p className = {styles.descriptionCard}>Shounen são populares e voltadas para o público masculino jovem, repletas de ação e aventura.</p>
                    <p className = {styles.exampleCard}><span>Exemplos:</span> "Boku no Hero", "One Piece"</p>
                </div>

                <div className = {styles.cardSecond}>
                    <p className = {styles.titleCard}>Seinen</p>
                    <p className = {styles.descriptionCard}>Seinen exploram temas mais complexos e profundos, abordando questões sociais e psicológicas.</p>
                    <p className = {styles.exampleCard}><span>Exemplos:</span> "Death Note", "Attack on Titan"</p>
                    
                </div>

                <div className = {styles.cardThird}>
                    <p className = {styles.titleCard}>Shoujo </p>
                    <p className = {styles.descriptionCard}>Shoujo são voltadas para o público feminino jovem, explorando temas românticos e emocionais.</p>
                    <p className = {styles.exampleCard}><span>Exemplos:</span> "Horimiya", "Fruits Basket"</p>
                </div>

                <div className = {styles.cardFourth}>
                    <p className = {styles.titleCard}>Josei </p>
                    <p className = {styles.descriptionCard}>Josei exploram temáticas mais maduras e realistas, abordando questões relacionadas à vida adulta</p>
                    <p className = {styles.exampleCard}><span>Exemplos:</span> "Nana", "Paradise Kiss"</p>
                </div>

                <div className = {styles.cardFifith}>
                    <p className = {styles.titleCard}>Kodomo </p>
                    <p className = {styles.descriptionCard}>Kodomo é destinada para o público infantil caracterizada por histórias lúdicas e educativas.</p>
                    <p className = {styles.exampleCard}><span>Exemplos:</span> "Pokémon", "Digimon"</p>
                </div>
            </div>
        </>
    )
}

export default CardSection