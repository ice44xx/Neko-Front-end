import Head from 'next/head';
import styles from '../styles/privacy.module.scss';
import HeaderAuth from '@/components/homeAuth/headerAuth';
import Footer from '@/components/common/footer';
import { useState, useEffect } from 'react';
import HeaderNoAuth from '@/components/homeNoAuth/headerNoAuth';

const Dmca = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('nekoanimes-token');
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Neko animes - DMCA</title>
      </Head>
      <main>
        {auth ? <HeaderAuth /> : <HeaderNoAuth />}

        <div className={styles.container}>
          <p className={styles.title}>Neko - DMCA</p>
          <div className={styles.container_dmca}>
            <p className={styles.desc}>
              Por favor, esteja ciente de que não hospedamos nenhum desses vídeos incorporados aqui. Todos os vídeos encontrados em nosso site são
              encontrados gratuitamente disponíveis em toda a web em sites como YouTube, Dailymotion ou Rutube, Nossa missão aqui, é organizar esses
              vídeos e tornar a sua busca mais facil e amigável. Nós simplesmente vinculamos ao vídeo que já está hospedado em outros sites. Se você
              está preocupado com o material protegido por direitos autorais que aparece neste site, sugerimos que você entre em contato com o site
              que está hospedando o vídeo e removê-lo de lá. Uma vez que o conteúdo é removido do site que hospeda seu conteúdo, ele será
              automaticamente removido de nekoanimes.com Não somos afiliados nem reivindicamos ser afiliados a nenhum dos proprietários de
              vídeos/transmissões reproduzidos em nosso site.
            </p>
            <p className={styles.desc}>
              Todo o conteúdo é de direitos autorais de seus respectivos proprietários. Pedimos a todos os proprietários de direitos autorais que
              reconheçam que os links contidos neste site estão localizados em outro lugar na web. O link incorporado aponta para o local do vídeo na
              Web. Por favor, direcione todas as questões de violação de direitos autorais para as empresas que hospedam esses arquivos (Videa,
              Rutube, Ustream.tv, DailyMotion, etc.).
            </p>
            <p className={styles.desc}>
              Nenhuma violação de direitos autorais é intencional nem implícita, nekoanimes.com simplesmente atua como um mecanismo de busca, não é
              responsável pelo conteúdo de sites externos. Certifique-se antes de enviar uma solicitação de remoção de A/V que a mídia em questão é
              realmente hospedada por nekoanimes.com. Todo o conteúdo de vídeo encontrado em nekoanimes.com não está hospedado em nossos servidores
              nem é criado ou carregado por nós.
            </p>
            <p className={styles.desc}>
              Nós não hospedamos ou carregamos nenhum fluxo. Não somos responsáveis pela precisão, conformidade, direitos autorais, legalidade,
              decência ou qualquer outro aspecto do conteúdo de tais fluxos. Nós só contemos links para outros sites na Internet. Se você tiver
              quaisquer problemas legais, entre em contato com os proprietários de arquivos de mídia / hosters ou provedor de links apropriados.
            </p>
            <p className={styles.desc}>
              Ao visitar/usar este site, você concorda e entende que todos os canais deste site contêm transmissões ao vivo incorporadas e links para
              o uploader original. Esses fluxos vêm de sites disponíveis gratuitamente na web, como Veetle.com, Justin.TV, Twitch.TV e outros. Nós não
              somos afiliados nem reivindicamos ser afiliados com qualquer um dos proprietários de streams apresentados neste site. Todo o conteúdo é
              de direitos autorais de seus respectivos proprietários. Gostaríamos de pedir a todos os proprietários de direitos autorais que
              reconheçam que os fluxos contidos neste site estão hospedados e localizados fora do nome de domínio/servidores deste site. Por favor,
              direcione todas as reivindicações DMCA para o site preciso que hospeda esses fluxos (Veetle.com, sockshare, putlocker, Justin.TV,
              Twitch.TV, etc.). Gostaríamos de agradecer sua atenção e compreensão sobre este assunto.
            </p>
            <p className={styles.desc}>
              <span>
                Alerta! Nosso site não transmite nenhum canal em nossos servidores, esses canais são de outros servidores, se você tiver um problema,
                entre em contato com o servidor que hospeda os canais.
              </span>
            </p>
            <p className={styles.desc}>
              Entre em contato conosco <br /> Se houver alguma dúvida sobre esta política de privacidade, você pode entrar em contato conosco.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dmca;
