import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const simulateProgress = () => {
      setProgress(0);
      setTimeout(() => {
        setProgress(30);
      }, 500);
      setTimeout(() => {
        setProgress(70);
      }, 1000);
      setTimeout(() => {
        setProgress(100);
      }, 1500);
    };

    simulateProgress();
  }, []);

  return (
    <div>
      <LoadingBar color={'#8400ff'} progress={progress} onLoaderFinished={() => setProgress(0)} />
    </div>
  );
};

export default Loading;
