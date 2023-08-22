import Link from 'next/link';
import styles from './styles.module.scss';
import { Form, Input } from 'reactstrap';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import profileService from '@/services/profileService';
import animeService, { AnimeType } from '@/services/animesService';
import Modal from './modal';

const HeaderAuth = () => {
  const router = useRouter();
  const [search, setSearch] = useState(true);
  const [randomName, setRandomName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [modalOpen, setModalOpen] = useState(true);

  const { data, error } = useSWR('/users/current', profileService.getUser);
  if (!data) return null;
  if (error) return error;

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/animes/search/${searchName}`);
    setSearchName('');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };

  const getAnime = async () => {
    const res = await animeService.findAll();
    return res.data;
  };

  const randomAnime = async () => {
    try {
      const animes = await getAnime();
      const animesName = animes.map((anime: AnimeType) => anime.name);

      const randomIndex = Math.floor(Math.random() * animesName.length);
      const randomAnimeName = animesName[randomIndex];
      setRandomName(randomAnimeName);
    } catch (error) {
      console.error('Erro ao obter os animes:', error);
    }
  };
  randomAnime();

  const handleSearchVisible = () => {
    setSearch(!search);
  };
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className={styles.container_master}>
        <div className={styles.nav}>
          <Link href='/home'>
            {' '}
            <img src='/assets/logo.png' alt='' className={styles.logo} />{' '}
          </Link>
          <div className={styles.container}>
            <div className={styles.container_btn}>
              {router.pathname !== '/home' && (
                <Link href={'/home'}>
                  <img src='/assets/home_arrow.png' alt='' className={styles.img_arrow} />
                </Link>
              )}
              <img src='/assets/lupa.png' alt='' className={styles.img} onClick={handleSearchVisible} />
            </div>
            <div className={styles.containerProfile}>
              <div className={styles.userName}>
                <p>{data.userName}</p>
              </div>
              <div className={styles.userProfile}>
                {data.image ? (
                  <img src={data.image} alt='' className={styles.userImg} onClick={handleModal} />
                ) : (
                  <Link onClick={handleModal} href={'/profile/photo'} className={styles.link}>
                    <p>Alterar foto</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.container_search} ${search ? styles.active : ''}`} id='containerSearch'>
          <Form className={styles.form} onSubmit={handleSearch}>
            <Input
              value={searchName}
              onChange={e => {
                setSearchName(e.currentTarget.value);
              }}
              type='search'
              placeholder='Pesquisar...'
              className={styles.input}
            ></Input>
          </Form>
        </div>
        <Modal randomName={randomName} modalOpen={modalOpen} handleLogout={handleLogout} />
      </div>
    </>
  );
};

export default HeaderAuth;
