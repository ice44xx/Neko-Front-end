import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from '../dashboardInsertAnimes/styles.module.scss';
import useSWR from 'swr';
import animeService from '@/services/animesService';
import { FormEvent, useState } from 'react';
import categoriesService, { CategoryType } from '@/services/categoriesService';
import genderService, { GenderType } from '@/services/genderService';
import { useRouter } from 'next/router';

interface Close {
  onClose: (id: number) => void;
  id: number;
}

const DashBoardPutAnimes: React.FC<Close> = ({ id, onClose }) => {
  const router = useRouter();
  const [featured, setFeatured] = useState(false);

  const handleClose = () => {
    onClose(id);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatured(e.target.checked);
  };

  const { data: animeData, error: animeError } = useSWR(`${id}`, animeService.getAnimeId);
  if (animeError) return animeError;

  const handleUpdateAnime = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const updatedData = {
        name: formData.get('name'),
        synopsis: formData.get('synopsis'),
        thumbnailUrl: formData.get('url'),
        featured: featured,
        categoryId: parseInt(formData.get('categories') as string, 10),
        anotherId: parseInt(formData.get('anothers') as string, 10),
        genderId: parseInt(formData.get('genders') as string, 10)
      };

      await animeService.update(id, updatedData);
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      console.error('Erro ao atualizar o anime:', error);
    }
  };

  const { data: categoriesData, error: categoriesError } = useSWR('/categories', categoriesService.getCategories);
  if (categoriesError) return categoriesError;

  const { data: genderData, error: genderError } = useSWR('/gender', genderService.getGenderAll);
  if (genderError) return genderError;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button className={styles.btn} onClick={handleClose}>
          <img src='/assets/fechar.png' alt='fechar' />
        </Button>
        <Form className={styles.form} onSubmit={handleUpdateAnime}>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='name' id='name' placeholder=' ' defaultValue={animeData?.name} required />
            <Label for='name' className={styles.label}>
              Anime / ID: {animeData?.id}
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup_textarea}>
            <textarea className={styles.input} name='synopsis' id='synopsis' placeholder=' ' defaultValue={animeData?.synopsis} required />
            <Label for='synopsis' className={styles.label}>
              Sinopse
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} type='text' name='url' id='url' placeholder=' ' defaultValue={animeData?.thumbnailUrl} required />
            <Label for='url' className={styles.label}>
              URL capa
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Input
              type='checkbox'
              className={styles.inputCheckbox}
              name='featured'
              id='featured'
              defaultChecked={animeData?.featured}
              onChange={handleCheckbox}
            />
            <Label for='featured' className={styles.labelCheckbox}>
              Em Destaque
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Label for='categories' className={styles.labelCheckbox}>
              Primeira Categoria
            </Label>
            <select id='categories' name='categories' defaultValue={animeData?.categories.id} className={styles.select} required>
              {categoriesData?.data?.categories.map((categories: CategoryType) => (
                <option value={categories.id} key={categories.id}>
                  {categories.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Label for='anothers' className={styles.labelCheckbox}>
              Segunda Categoria
            </Label>
            <select id='anothers' name='anothers' defaultValue={animeData?.anothers.id} className={styles.select} required>
              {categoriesData?.data?.categories.map((categories: CategoryType) => (
                <option value={categories.id} key={categories.id}>
                  {categories.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Label className={styles.labelCheckbox}>Gênero</Label>
            <select id='genders' name='genders' defaultValue={animeData?.gender.id} className={styles.select} required>
              {genderData?.data?.map((genders: GenderType) => (
                <option value={genders.id} key={genders.id}>
                  {genders.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button className={styles.submit} type='submit'>
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default DashBoardPutAnimes;
