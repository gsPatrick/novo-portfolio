'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Projects.module.css';
import PROJECTS from '@/data/projects.json';

const ProjectCard = ({ project, index, scrollYProgress, total }) => {
    // Mobile detection
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Determine current media based on device
    const currentUrl = isMobile && project.urlMobile ? project.urlMobile : project.url;
    const currentType = isMobile && project.typeMobile ? project.typeMobile : project.type;

    // Optimized offsets for 400vh runway
    const mobileStartOffsets = [0.12, 0.42, 0.72];
    const entranceRange = isMobile ? 0.15 : 0.1;

    const start = isMobile ? mobileStartOffsets[index] : (0.25 + index * 0.25);
    const end = start + 0.25;
    const nextStart = isMobile ? (mobileStartOffsets[index + 1] || 1.1) : (start + 0.25);

    // Entrance: Linear y transform for Desktop only
    const y = useTransform(
        scrollYProgress,
        [Math.max(0, start - entranceRange), start],
        [isMobile ? "0%" : "100%", "0%"]
    );

    const isLast = index === total - 1;

    // Exit: Subtle scale for Desktop only
    const scaleTransform = useTransform(
        scrollYProgress,
        [nextStart - 0.1, nextStart],
        [1, isLast ? 1 : 0.92]
    );
    const scale = isMobile ? 1 : scaleTransform;

    // Use opacity based depth for Desktop only
    const cardOpacityTransform = useTransform(
        scrollYProgress,
        [nextStart - 0.1, nextStart],
        [1, isLast || !isMobile ? 1 : 0.5]
    );
    const cardOpacity = isMobile ? 1 : cardOpacityTransform;

    // Desktop only filter
    const brightnessTransform = useTransform(
        scrollYProgress,
        [nextStart - 0.1, nextStart],
        ["brightness(1)", isLast ? "brightness(1)" : "brightness(0.3)"]
    );
    const brightness = isMobile ? "none" : brightnessTransform;

    return (
        <motion.div
            className={styles.cardWrapper}
            initial={isMobile ? { opacity: 0, y: 50 } : {}}
            whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
                y: isMobile ? 0 : y,
                scale,
                opacity: cardOpacity,
                filter: brightness,
                zIndex: index
            }}
        >
            <div className={styles.card} style={{ backgroundColor: project.color }}>
                <div className={styles.imageContainer}>
                    {currentType === 'video' ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            webkit-playsinline="true"
                            preload="auto"
                            className={styles.image}
                            src={currentUrl}
                        />
                    ) : (
                        <img
                            src={currentUrl}
                            alt={project.title}
                            className={styles.image}
                        />
                    )}
                    <div className={styles.overlay} />
                </div>

                <div className={styles.info}>
                    <div className={styles.header}>
                        <span className={styles.number}>0{project.id}</span>
                        <span className={styles.category}>{project.category}</span>
                    </div>

                    <h2 className={styles.title}>{project.title}</h2>
                    <p className={styles.description}>{project.description}</p>

                    <motion.button
                        className={styles.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Ver Detalhes
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default function Projects() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const lines = [
        { text: "VEJA OS", type: "solid", delay: 0 },
        { text: "PROJETOS", type: "solid", delay: 0.4 },
        { text: "QUE REALIZEI", type: "outline", delay: 0.8 }
    ];

    return (
        <section ref={containerRef} className={styles.projects} id="work">
            <div className={styles.introSection}>
                <div className={styles.introGlow} />
                <motion.div
                    className={styles.textStack}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {lines.map((line, lineIndex) => (
                        <div key={lineIndex} className={line.type === "solid" ? styles.line : styles.lineSub}>
                            {line.text.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { y: "100%", opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                duration: 0.8,
                                                delay: line.delay + (i * 0.03),
                                                ease: [0.22, 1, 0.36, 1]
                                            }
                                        }
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        whiteSpace: char === " " ? 'pre' : 'normal'
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className={styles.stickyContainer}>
                {PROJECTS.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        scrollYProgress={scrollYProgress}
                        total={PROJECTS.length}
                    />
                ))}
            </div>
        </section>
    );
}
