import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

const NoBus = () => {
  const animationContainer = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import('../../../assets/animations/noBusAnimation.json')
      .then((data) => {
        setAnimationData({ ...data });
      })
      .catch((error) => {
        console.error('Error loading animation data:', error);
      });
  }, []);

  useEffect(() => {
    if (animationData) {
      const animation = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => {
        animation.destroy();
      };
    }
  }, [animationData]);

  return (
    <div className="p-3">
      <div
        style={{
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div
          ref={animationContainer}
          style={{ width: '500px', marginBottom: '20px' }}
        />
      </div>
    </div>
  );
};

export default NoBus;
