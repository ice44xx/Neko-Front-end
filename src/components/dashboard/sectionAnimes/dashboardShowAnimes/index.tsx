import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../dashboardInsertAnimes/styles.module.scss';
import useSWR from 'swr';
import animeService from '@/services/animesService';

interface Close {
  onClose: (id: number) => void;
  id: number;
}

const DashBoardShowAnimes: React.FC<Close> = ({ id, onClose }) => {
  const { data, error } = useSWR(`${id}`, animeService.getAnimeId);

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button className={styles.btn} onClick={handleClose}>
          <img src='/assets/fechar.png' alt='fechar' />
        </Button>
        <Form className={styles.form}>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='name' id='name' placeholder=' ' defaultValue={data?.name} />
            <Label for='name' className={styles.label}>
              Anime / ID: {data?.id}
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='synopsis' id='synopsis' placeholder=' ' defaultValue={data?.synopsis} />
            <Label for='synopsis' className={styles.label}>
              Sinopse
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='url' id='url' placeholder=' ' defaultValue={data?.thumbnailUrl} />
            <Label for='url' className={styles.label}>
              URL capa
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='featured' id='featured' placeholder=' ' defaultValue={data?.featured ? 'Sim' : 'Não'} />
            <Label for='featured' className={styles.label}>
              Em destaque
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='categories' id='categories' placeholder=' ' defaultValue={data?.categories?.name} />
            <Label for='categories' className={styles.label}>
              Primeira Categoria
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='anothers' id='anothers' placeholder=' ' defaultValue={data?.anothers?.name} />
            <Label for='anothers' className={styles.label}>
              Segunda Categoria
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='gender' id='gender' placeholder=' ' defaultValue={data?.gender?.name} />
            <Label for='gender' className={styles.label}>
              Gênero
            </Label>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
export default DashBoardShowAnimes;
