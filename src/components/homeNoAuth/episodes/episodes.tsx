import { EpisodesType } from '@/services/animesService';
import styles from '../../../../styles/animes.module.scss';
import { Button } from 'reactstrap';
import React from 'react';

interface EpisodeProps {
  selectedEpisode?: EpisodesType;
  handlePreviousEpisode: () => void;
  handleNextEpisode: () => void;
}

const Episodes: React.FC<EpisodeProps> = ({ selectedEpisode, handlePreviousEpisode, handleNextEpisode }) => {
  return (
    <div className={styles.container_left}>
      <p className={styles.title}>{selectedEpisode?.name}</p>
      <div className={styles.container_stream}>
        {selectedEpisode && <iframe className={styles.iframe} allowFullScreen src={selectedEpisode.videoUrl} />}
        <div className={styles.container_stream_prev_next}>
          <Button className={styles.btn} onClick={handlePreviousEpisode}>
            <img src='/assets/arrowBtnEpisodeLeft.png' alt='seta pra esquerda' /> Voltar episódio
          </Button>
          <p></p>
          <Button className={styles.btn} onClick={handleNextEpisode}>
            Próximo episódio <img src='/assets/arrowBtnEpisodeRight.png' alt='seta pra direita' />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Episodes;
