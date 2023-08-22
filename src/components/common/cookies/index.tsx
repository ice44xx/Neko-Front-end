import { Button } from 'reactstrap';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

const Cookies = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAcceptedCookie = localStorage.getItem('hasAcceptedCookie');
    if (!hasAcceptedCookie) {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000 * 4);
    }
  }, []);

  const handleCookieOpen = () => {
    setIsOpen(false);
    localStorage.setItem('hasAcceptedCookie', 'true');
  };

  setTimeout(() => {}, 1000 * 3);

  return (
    <div className={`${styles.cookies} ${isOpen ? styles.cookiesOpen : ''}`}>
      <img src='/assets/cookie.png' alt='Cookie' />
      <div className={styles.info}>Este site utiliza cookies, para melhorar sua experiência.</div>
      <div className={styles.container_btn}>
        <Button onClick={handleCookieOpen} className={`${styles.btn} ${styles.pulse}`}>
          Aceitar
        </Button>
      </div>
    </div>
  );
};

export default Cookies;
