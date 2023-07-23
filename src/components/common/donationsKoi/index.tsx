import {useEffect} from 'react'

const DonationsKoi = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;

    const koFiConfig = {
      type: 'floating-chat',
      'floating-chat.donateButton.text': 'Doação',
      'floating-chat.donateButton.background-color': '#794bc4',
      'floating-chat.donateButton.text-color': '#fff'
    };

    script.onload = () => {
      window.kofiWidgetOverlay.draw('nekoanimes', koFiConfig);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return(
    <div></div>
  )
}

export default DonationsKoi