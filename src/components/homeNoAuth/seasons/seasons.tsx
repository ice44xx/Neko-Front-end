import styles from '../../../../styles/animes.module.scss';
import { AnimeType } from '@/services/animesService';
import { Button } from 'reactstrap';

interface SeasonsProps {
  anime?: AnimeType;
  visibleSeasons: boolean[];
  toggleSeasonVisibility: (index: number) => void;
  handleEpisodeClick: (episodeId: number, episodeOrder: number, animeName: string, videoUrl: string, thumbnailUrl: string) => void;
}

const Seasons: React.FC<SeasonsProps> = ({ anime, visibleSeasons, toggleSeasonVisibility, handleEpisodeClick }) => {
  return (
    <>
      {anime?.seasons?.map((season, index) => (
        <div key={season.id} className={styles.list}>
          <div className={styles.container_title}>
            <Button className={styles.btn_title} onClick={() => toggleSeasonVisibility(index)}>
              <p className={styles.title}>{season.name.slice(0, 11)}</p>
            </Button>
            <Button className={styles.btn_arrow} onClick={() => toggleSeasonVisibility(index)}>
              <img src='/assets/arrowBtn.png' alt='' className={styles.arrow} />
            </Button>
          </div>
          {visibleSeasons[index] &&
            season.episodes?.map(episode => (
              <div key={episode.id} className={styles.item_list}>
                <Button
                  className={styles.btn}
                  onClick={() => handleEpisodeClick(episode.id, episode.episodeOrder, anime.name, episode.videoUrl, anime.thumbnailUrl)}
                >
                  {episode.name}
                </Button>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default Seasons;
