'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Character.module.css';

export default function Character() {
    return (
        <div className={styles.characterContainer}>
            <div className={styles.videoWrapper}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
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
