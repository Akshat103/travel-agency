import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const animationContainer = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import('../assets/animations/page404.json')
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
          style={{ width: '400px', marginBottom: '20px' }}
        />
        <p>The page you are looking for does not exist.</p>
        <Link to='/'>Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
