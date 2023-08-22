import FooterGeneric from '@/components/common/footerGeneric';
import styles from '../../../styles/animes.module.scss';
import HeaderAuth from '@/components/homeAuth/headerAuth';
import HeaderNoAuth from '@/components/homeNoAuth/headerNoAuth';
import animeService, { AnimeType } from '@/services/animesService';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, FormEvent } from 'react';
import Categories from '@/components/homeAuth/categories';
import watchService from '@/services/watchService';
import profileService from '@/services/profileService';
import commentService, { CommentsForGet, CommentsType } from '@/services/commentService';
import LoadingBar from 'react-top-loading-bar';
import CommentComponent from '@/components/homeNoAuth/comments/comments';
import CommentsLogin from '@/components/homeNoAuth/comments/commentsLogin';
import CommentsOffline from '@/components/homeNoAuth/comments/commentsOffline';
import Seasons from '@/components/homeNoAuth/seasons/seasons';
import Episodes from '@/components/homeNoAuth/episodes/episodes';
import Pagination from '@/components/common/paginations/pagination';

const AnimeEpisode = () => {
  const router = useRouter();
  const { name, id } = router.query;
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [anime, setAnime] = useState<AnimeType>();
  const [comments, setComments] = useState<CommentsForGet[] | null>(null);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [liked, setLiked] = useState<LikedState>({});
  const [commentCount, setCommentCount] = useState(0);
  const commentsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleSeasons, setVisibleSeasons] = useState(new Array(anime?.seasons?.length).fill(true));
  const episodeId = typeof id === 'string' ? parseInt(id) : undefined;
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | undefined>(episodeId);
  const selectedEpisode = anime?.seasons?.flatMap(season => season.episodes)?.find(episode => episode?.id === selectedEpisodeId);

  console.log(selectedEpisode);
  useEffect(() => {
    profileService.getUser().then(user => {
      setUserName(user.userName);
      setUserPhoto(user.image);
      setUserId(user.id);

      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        setAuth(true);
      }
    });

    getAnime();
    getComments();
    console.log(episodeId);

    if (selectedEpisodeId !== undefined) {
      sessionStorage.setItem('selectedEpisodeId', selectedEpisodeId.toString());
    }

    const storedEpisodeId = sessionStorage.getItem('selectedEpisodeId');
    if (storedEpisodeId) {
      setSelectedEpisodeId(parseInt(storedEpisodeId));
    }
  }, [name, id, episodeId, selectedEpisodeId, liked]);

  const getAnime = async () => {
    if (typeof name !== 'string') return;

    const res = await animeService.getAnime(name);

    if (res) {
      setAnime(res);
    }
  };
  const getComments = async () => {
    if (typeof episodeId !== 'number') return;
    const res = await commentService.getComments(episodeId);
    if (res) {
      setComments(res);
      setCommentCount(res.length);
    }
    setLoading(false);
  };
  const handleEpisodeClick = async (episodeId: number, ordem: number, name: string, videoUrl: string, thumbnailUrl: string) => {
    setSelectedEpisodeId(episodeId);
    router.push(`/animes/${anime?.name}/${episodeId}`);

    await watchService.getClick(episodeId, ordem, name, videoUrl, thumbnailUrl);
  };
  const handlePreviousEpisode = () => {
    if (anime && selectedEpisodeId) {
      const episodes = anime.seasons?.flatMap(season => season.episodes) || [];
      const currentIndex = episodes.findIndex(episode => episode?.id === selectedEpisodeId);
      if (currentIndex > 0) {
        const previousEpisodeId = episodes[currentIndex - 1]?.id;
        setSelectedEpisodeId(previousEpisodeId);
        router.push(`/animes/${name}/${previousEpisodeId}`);
      }
    }
  };
  const handleNextEpisode = () => {
    if (anime && selectedEpisodeId) {
      const episodes = anime.seasons?.flatMap(season => season.episodes) || [];
      const currentIndex = episodes.findIndex(episode => episode?.id === selectedEpisodeId);
      if (currentIndex < episodes.length - 1) {
        const nextEpisodeId = episodes[currentIndex + 1]?.id;
        setSelectedEpisodeId(nextEpisodeId);
        router.push(`/animes/${name}/${nextEpisodeId}`);
      }
    }
  };
  const toggleSeasonVisibility = (index: number) => {
    setVisibleSeasons(prevState => {
      const updatedVisibleSeasons = [...prevState];
      updatedVisibleSeasons[index] = !updatedVisibleSeasons[index];
      return updatedVisibleSeasons;
    });
  };
  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get('content')!.toString();
    const userPhoto = formData.get('userPhoto')!.toString();
    const userName = formData.get('userName')!.toString();

    // Obtenha os valores de animeId e episodeId da FormData
    const animeIdValue = formData.get('animeId');
    const episodeIdValue = formData.get('episodeId');

    // Verifique se os valores não são nulos antes de fazer a conversão
    const animeId = animeIdValue ? parseInt(animeIdValue.toString(), 10) : null;
    const episodeId = episodeIdValue ? parseInt(episodeIdValue.toString(), 10) : null;

    const attributes: CommentsType = { animeId, episodeId, content, userPhoto, userName };

    await commentService.createComment(attributes);

    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    textarea.value = '';
    router.reload();
  };
  const handleDeleteComment = async (id: number) => {
    await commentService.delete(id);
    router.reload();
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments?.slice(indexOfFirstComment, indexOfLastComment);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  type LikedState = { [commentId: number]: boolean };

  const handleLike = async (commentId: number) => {
    // Verifica o estado atual do "liked" para o comentário específico (commentId)
    const isLiked = liked[commentId] || false;

    // Se o comentário já foi "gostado", remove o "like"
    if (isLiked) {
      await commentService.removeLike(commentId);
    } else {
      // Caso contrário, adiciona o "like"
      await commentService.like(commentId);
    }

    // Atualiza o estado "liked" apenas para o comentário específico (commentId)
    setLiked(prevLiked => ({ ...prevLiked, [commentId]: !isLiked }));
  };

  return (
    <>
      <Head>
        <title>
          {name} - {selectedEpisode?.name}
        </title>
      </Head>
      <main>
        <LoadingBar progress={loading ? 0 : 100} color='#631dc0' height={3} onLoaderFinished={() => setLoading(false)} />
        {auth ? (
          <>
            <HeaderAuth /> <Categories />
          </>
        ) : (
          <HeaderNoAuth />
        )}
        <div className={styles.container_master}>
          <div className={styles.container}>
            <div className={styles.container_left_right}>
              <Episodes selectedEpisode={selectedEpisode} handleNextEpisode={handleNextEpisode} handlePreviousEpisode={handlePreviousEpisode} />
              <div className={styles.container_right_img}>
                <img src='/assets/catfashion.png' alt='' className={styles.cat} />
                <div className={styles.container_right}>
                  <Seasons
                    anime={anime}
                    handleEpisodeClick={handleEpisodeClick}
                    toggleSeasonVisibility={toggleSeasonVisibility}
                    visibleSeasons={visibleSeasons}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container_cat}>
            <img src='/assets/head.png' alt='Logo neko' className={styles.cat_comment} />
          </div>
          <div className={styles.container_master_comments}>
            <img src='/assets/catid.png' alt='Cat' className={styles.cat_comment_two} />
            <div className={styles.alert}>
              <p>
                <img src='/assets/alert.png' alt='alerta' /> PEDIMOS COM CARINHO, QUE RESPEITEM OS OUTROS E NÃO COMENTE SPOILERS
              </p>
            </div>
            {auth ? (
              <CommentsLogin
                auth={auth}
                anime={anime?.id}
                episodeId={episodeId}
                userId={userId}
                userName={userName}
                userPhoto={userPhoto}
                handleCreateComment={handleCreateComment}
              />
            ) : (
              <CommentsOffline />
            )}
            <div className={styles.count}>
              {commentCount > 0 && <>{commentCount > 1 ? <p>{commentCount} Comentários</p> : <p>{commentCount} Comentário</p>}</>}
            </div>
            <CommentComponent
              auth={auth}
              comment={comments}
              currentComments={currentComments}
              handleDeleteComment={handleDeleteComment}
              handleLike={handleLike}
              liked={liked}
              userId={userId}
            />
            <Pagination
              comments={comments}
              currentPage={currentPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              indexOfLastComment={indexOfLastComment}
            />
          </div>
        </div>
        <FooterGeneric />
      </main>
    </>
  );
};

export default AnimeEpisode;
