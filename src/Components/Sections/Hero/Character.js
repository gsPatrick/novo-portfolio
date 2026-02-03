import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import styles from './Character.module.css';

export default function Character() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay blocked:", error);
            });
        }
    }, []);

    return (
        <div className={styles.characterContainer}>
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    className={styles.video}
                    key="hero-video"
                >
                    <source src="/patrick-hero.webm" type="video/webm" />
                    <source src="/patrick.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
