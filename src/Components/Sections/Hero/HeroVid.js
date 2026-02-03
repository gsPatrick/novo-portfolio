import { useRef, useEffect } from 'react';
import styles from './HeroVid.module.css';

export default function HeroVid() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay blocked:", error);
            });
        }
    }, []);

    return (
        <div className={styles.videoContainer}>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className={styles.video}
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-spheres-and-lines-41131-large.mp4" type="video/mp4" />
            </video>
            <div className={styles.overlay} />
        </div>
    );
}
