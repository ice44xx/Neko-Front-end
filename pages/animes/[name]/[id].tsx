import FooterGeneric from '@/components/common/footerGeneric';
import styles from '../../../styles/animes.module.scss'
import HeaderAuth from "@/components/homeAuth/headerAuth";
import HeadNoAuth from "@/components/homeNoAuth/headerNoAuth";
import animeService, { AnimeType } from "@/services/animesService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, HtmlHTMLAttributes } from "react";
import { Button, Form } from 'reactstrap';
import Categories from '@/components/homeAuth/categories';
import watchService from '@/services/watchService';
import profileService from '@/services/profileService';
import commentService, { CommentsForGet, CommentsType } from '@/services/commentService';
import Link from 'next/link';
import LoadingBar from 'react-top-loading-bar';


const AnimeEpisode = () => {
  const router = useRouter()
  const {name, id} = router.query
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false)
  const [anime, setAnime] = useState<AnimeType>()
  const [comments, setComments] = useState<CommentsForGet[] | null>(null);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState('')
  const [userPhoto, setUserPhoto] = useState('')
  const [liked, setLiked] = useState<LikedState>({});
  const [commentCount, setCommentCount] = useState(0);
  const commentsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleSeasons, setVisibleSeasons] = useState(new Array(anime?.seasons?.length).fill(true));
  const episodeId = typeof id === 'string' ? parseInt(id) : undefined;
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | undefined>(episodeId);
  const selectedEpisode = anime?.seasons?.flatMap((season) => season.episodes)?.find((episode) => episode?.id === selectedEpisodeId);

  useEffect(() => {
    profileService.getUser().then((user) => {
      setUserName(user.userName)
      setUserPhoto(user.image)
      setUserId(user.id)

      const token = sessionStorage.getItem('nekoanimes-token')
      if(token) {
        setAuth(true)
      }
    
      getAnime()
      getComments()
      setSelectedEpisodeId(episodeId);
    })
  },[name, id, episodeId, comments])
  
  const getAnime = async () => {
    if(typeof name !== 'string') return

    const res = await animeService.getAnime(name)

    if(res) {
      setAnime(res)
    }
    setLoading(false)
  }
  const getComments = async () => {
    if(typeof episodeId !== 'number') return
    const res = await commentService.getComments(episodeId)
    if(res) {
      setComments(res)
      setCommentCount(res.length)
    }
    setLoading(false)
  }
  const handleEpisodeClick = async (episodeId: number, ordem: number, name: string, videoUrl: string, thumbnailUrl: string) => {
    setSelectedEpisodeId(episodeId);
    router.push(`/animes/${anime?.name}/${episodeId}`)

    await watchService.getClick(episodeId, ordem, name, videoUrl, thumbnailUrl)

  };
  const handlePreviousEpisode = () => {
    if (anime && selectedEpisodeId) {
      const episodes = anime.seasons?.flatMap((season) => season.episodes) || [];
      const currentIndex = episodes.findIndex((episode) => episode?.id === selectedEpisodeId);
      if (currentIndex > 0) {
        const previousEpisodeId = episodes[currentIndex - 1]?.id;
        setSelectedEpisodeId(previousEpisodeId);
      }
    }
  };
  const handleNextEpisode = () => {
    if (anime && selectedEpisodeId) {
      const episodes = anime.seasons?.flatMap((season) => season.episodes) || [];
      const currentIndex = episodes.findIndex((episode) => episode?.id === selectedEpisodeId);
      if (currentIndex < episodes.length - 1) {
        const nextEpisodeId = episodes[currentIndex + 1]?.id;
        setSelectedEpisodeId(nextEpisodeId);
      }
    }
  };
  const toggleSeasonVisibility = (index: number) => {
    setVisibleSeasons((prevState) => {
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

    await commentService.createComment(attributes)

    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    textarea.value = ''
  };
  const handleDeleteComment = async (id: number) => {
    await commentService.delete(id)
  }

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
    setLiked((prevLiked) => ({ ...prevLiked, [commentId]: !isLiked }));
  };
    
  return (
    <>
      <Head><title>{name} - {selectedEpisode?.name}</title></Head>
      <main>
      <LoadingBar progress={loading ? 0 : 100} color="#631dc0" height={3} onLoaderFinished={() => setLoading(false)}/>
        {auth ? (
          <>
            <HeaderAuth/>
            <Categories/>
          </>
        ) : (
          <HeadNoAuth/>
        )}
        <div className={styles.container_master}> 
          <div className={styles.container}>
            <div className={styles.container_left_right}>
              <div className={styles.container_left}>
                <p className={styles.title}>{selectedEpisode?.name}</p>
                <div className={styles.container_stream}>
                  {selectedEpisode && <iframe className={styles.iframe} allowFullScreen src={selectedEpisode.videoUrl} />}

                  <div className={styles.container_stream_prev_next}>
                    <Button className={styles.btn} onClick={handlePreviousEpisode}><img src="/assets/arrowBtnEpisodeLeft.png" alt="seta pra esquerda" /> Voltar episódio</Button>
                    <p></p>
                    <Button className={styles.btn} onClick={handleNextEpisode}>Próximo episódio <img src="/assets/arrowBtnEpisodeRight.png" alt="seta pra direita" /></Button>
                  </div>
                </div>
                
              </div>
              <div className={styles.container_right_img}>
                <img src="/assets/catfashion.png" alt="" className={styles.cat} />
                <div className={styles.container_right}>
                  {anime?.seasons?.map((season, index) => (
                    <div key={season.id} className={styles.list}>
                      <div className={styles.container_title}>
                        <Button className={styles.btn_title} onClick={() => toggleSeasonVisibility(index)} ><p className={styles.title}>{season.name.slice(0, 11)}</p></Button>
                        <Button className={styles.btn_arrow} onClick={() => toggleSeasonVisibility(index)}><img src="/assets/arrowBtn.png" alt="" className={styles.arrow} /></Button>
                      </div>
                      {visibleSeasons[index] &&  season.episodes?.map((episode) => (
                        <div key={episode.id} className={styles.item_list}>
                          <Button className={styles.btn} onClick={() => handleEpisodeClick(episode.id, episode.episodeOrder, anime.name, episode.videoUrl, anime.thumbnailUrl)}>{episode.name}</Button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container_cat}>
            <img src="/assets/head.png" alt="Cat" className={styles.cat_comment}/>
          </div>
          <div className={styles.container_master_comments}>
            <img src="/assets/catid.png" alt="Cat" className={styles.cat_comment_two} />
            <div className={styles.alert}>
              <p><img src="/assets/alert.png" alt="" /> PEDIMOS COM CARINHO, QUE RESPEITEM OS OUTROS E NÃO COMENTE SPOILERS</p>
            </div>
            {auth ? (
              <div className={styles.container_comments}>
                <div className={styles.containerPhoto}> 
                  {userPhoto ? (
                    <img src={userPhoto} alt={userName} className={styles.profile}/>
                  ) : (
                    <img src={'/assets/catwelcome.png'} alt={userName} className={styles.profile_false}/>
                  )}
                    
                  </div>

                  <div className={styles.container_textarea}>
                    <div className={styles.title}><p>Comentar como {userName}</p></div>
                    <Form className={styles.form} onSubmit={handleCreateComment}>
                      <input type="hidden" id="animeId" name="animeId" value={episodeId} />
                      <input type="hidden" id="episodeId" name="episodeId" value={anime?.id} />
                      <input type="hidden" id="userPhoto" name="userPhoto" value={userPhoto} />
                      <input type="hidden" id="userName" name="userName" value={userName} />
                      <textarea className={styles.comment} id='content' maxLength={180} name='content' placeholder='Deixe um comentário...'></textarea>
                      <div className={styles.container_btn}><Button type='submit' className={styles.btn}>Comentar</Button></div>
                    </Form>
                  </div>
                </div>
                ) : (
                <div className={styles.container_comments_login}>
                  <p className={styles.title}>Comentários</p>
                  <p className={styles.subtitle}>Quer ajudar a impulsionar nossa comunidade?</p>

                  <div className={styles.container_btn}>
                    <Link href={'/login'}><Button className={styles.btn}>Fazer login</Button></Link>
                    <Link href={'/register'}><Button className={styles.btn}>Criar conta</Button></Link>
                  </div>
                </div>
              )}
              <div className={styles.count}>
                {commentCount > 0 && (
                  <>
                    {commentCount > 1 ? (
                    <p>{commentCount} Comentários</p>
                  ): (
                    <p>{commentCount} Comentário</p>
                  )}
                  </>
                )}
              </div>
              {currentComments?.map((comment) => (
                <div className={styles.container_comments_all}>
                  <div className={styles.container_textarea}>
                    <div className={styles.container_title}>
                      <div className={styles.container_photo}>
                        {comment.userPhoto ? (
                          <img src={comment.userPhoto} alt={comment.userName} className={styles.profile} />
                        ) : (
                          <img src={`/assets/catwelcome.png`} alt={comment.userName} className={styles.profile_false} />
                        )}
                      </div>
                      <p className={styles.title}>{comment.userName}</p>
                      {comment.userId === Number(userId) && (
                        <img src="/assets/trash.png" alt='lixeira' className={styles.trash} onClick={() => handleDeleteComment(comment.id)}/>
                      )}
                    </div>
                    <p className={styles.comment}>{comment.content}</p>

                    <div className={styles.date}>
                      <div className={styles.like}>
                        {auth ? (
                          <>
                            <Button className={`${styles.like_btn} ${liked[comment.id] ? styles.liked : styles.notLiked}`} onClick={() => handleLike(comment.id)}></Button>
                            <p>{comment.likeComments.length}</p>
                          </>
                        ) : (
                          <>
                            <Button className={`${styles.like_btn} ${styles.notLiked}`} onClick={() => router.push('/login')}></Button>
                            <p>{comment.likeComments.length}</p>
                          </>
                        )}
                      </div>
                      <p>{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.pagination}>
              {comments && comments.length >= 6 ? (
                <>
                  <Button onClick={handlePreviousPage} className={styles.btn} disabled={currentPage === 1}>Página Anterior</Button>
                  <Button onClick={handleNextPage} className={styles.btn} disabled={indexOfLastComment >= comments?.length}>Próxima Página</Button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <FooterGeneric/>
      </main>
    </>
  )
};
  
export default AnimeEpisode;
