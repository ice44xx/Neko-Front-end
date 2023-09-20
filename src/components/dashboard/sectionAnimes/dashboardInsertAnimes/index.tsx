import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from './styles.module.scss';
import categoriesService, { CategoryType } from '@/services/categoriesService';
import useSWR from 'swr';
import genderService, { GenderType } from '@/services/genderService';
import { useState, FormEvent } from 'react';
import animeService, { CreateAnimeType } from '@/services/animesService';
import { useRouter } from 'next/router';
interface Close {
  onClose: () => void;
}
const DashBoardInsertAnimes: React.FC<Close> = ({ onClose }) => {
  const router = useRouter();
  const [featured, setFeatured] = useState(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatured(e.target.checked);
    console.log(featured);
  };
  const handleClose = () => {
    onClose();
  };

  const { data: categoriesData, error: categoriesError } = useSWR('/categories', categoriesService.getCategories);

  const { data: genderData, error: genderError } = useSWR('/gender', genderService.getGenderAll);

  const handleCreateAnime = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')!.toString();
    const synopsis = formData.get('synopsis')!.toString();
    const thumbnailUrl = formData.get('url')!.toString();
    const featured = formData.get('featured') === 'on';
    const categoryId = formData.get('categories')!.toString();
    const anotherId = formData.get('anothers')!.toString();
    const genderId = formData.get('genders')!.toString();

    const attributes: CreateAnimeType = {
      name,
      thumbnailUrl,
      synopsis,
      featured,
      categoryId: parseInt(categoryId),
      anotherId: parseInt(anotherId),
      genderId: parseInt(genderId)
    };
    await animeService.create(attributes);
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button className={styles.btn} onClick={handleClose}>
          <img src='/assets/fechar.png' alt='fechar' />
        </Button>
        <Form className={styles.form} onSubmit={handleCreateAnime}>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} name='name' id='name' placeholder=' ' required />
            <Label for='name' className={styles.label}>
              Nome do Anime
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} name='synopsis' id='synopsis' placeholder=' ' required />
            <Label for='synopsis' className={styles.label}>
              Sinopse
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Input className={styles.input} name='url' id='url' placeholder=' ' required />
            <Label for='url' className={styles.label}>
              URL capa
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Input type='checkbox' className={styles.inputCheckbox} name='featured' id='featured' checked={featured} onChange={handleCheckbox} />
            <Label for='featured' className={styles.labelCheckbox}>
              Em Destaque
            </Label>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Label for='categories' className={styles.labelCheckbox}>
              Primeira Categoria
            </Label>
            <select id='categories' name='categories' className={styles.select} required>
              {categoriesData?.data.categories.map((categories: CategoryType) => (
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
            <select id='anothers' name='anothers' className={styles.select} required>
              {categoriesData?.data.categories.map((categories: CategoryType) => (
                <option value={categories.id} key={categories.id}>
                  {categories.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup className={styles.formgroupCheck}>
            <Label className={styles.labelCheckbox}>Gênero</Label>
            <select id='genders' name='genders' className={styles.select} required>
              {genderData?.data.map((genders: GenderType) => (
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
export default DashBoardInsertAnimes;
