import React from 'react';
import Lottie, { Options } from 'react-lottie';
import lightsabersAnimation from '../utils/LoadingAnimation.json';

const LoadingAnimation: React.FC = () => {
    const defaultOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: lightsabersAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
            <Lottie options={defaultOptions} height={200} width={200} />
        </div>
    );
};

export default LoadingAnimation;
