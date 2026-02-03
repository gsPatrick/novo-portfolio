'use client';

import styles from './HeroVid.module.css';

export default function HeroVid() {
    return (
        <div className={styles.videoContainer}>
            <video
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
