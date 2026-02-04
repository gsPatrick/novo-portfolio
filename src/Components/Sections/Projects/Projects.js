'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Projects.module.css';

const PROJECTS = [
    {
        id: 1,
        title: 'Nexus Alpha',
        category: 'Plataforma Enterprise',
        description: 'Uma revolução na visualização de dados complexos, unindo arquitetura de microsserviços com uma interface cinematográfica.',
        color: '#0a0a0a',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000'
    },
    {
        id: 2,
        title: 'Aura Motion',
        category: 'Design Sustentável',
        description: 'Experiência imersiva que redefine como interagimos com o consumo de energia renovável através de motion design.',
        color: '#050505',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000'
    },
    {
        id: 3,
        title: 'Quantum Core',
        category: 'Engenharia de Software',
        description: 'Otimização de performance em escala global, processando milhões de requisições com latência próxima de zero.',
        color: '#080808',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000'
    }
];

const ProjectCard = ({ project, index, scrollYProgress, total }) => {
    // Mobile detection
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Precise cinematic ranges for 350vh scroll runway
    // Total section is 1.0. Intro is ~0.11.
    const mobileStartOffsets = [0.08, 0.40, 0.72];
    const mobileDuration = 0.28;

    const start = isMobile ? mobileStartOffsets[index] : (0.25 + index * 0.25);
    const end = start + (isMobile ? mobileDuration : 0.25);

    // The next card starts rising later
    const nextStart = isMobile ? (mobileStartOffsets[index + 1] || 1.1) : (start + 0.25);

    // Entrance: Rise from 100% to 0%
    const y = useTransform(
        scrollYProgress,
        [Math.max(0, start - (isMobile ? 0.08 : 0.1)), start],
        ["100%", "0%"]
    );

    // Exit: Scale down and darken as the NEXT one starts to rise
    const isLast = index === total - 1;

    const scale = useTransform(
        scrollYProgress,
        [nextStart - 0.1, nextStart],
        [1, isLast ? 1 : 0.9]
    );

    const brightness = useTransform(
        scrollYProgress,
        [nextStart - 0.1, nextStart],
        ["brightness(1)", isLast ? "brightness(1)" : "brightness(0.3)"]
    );

    const opacity = useTransform(
        scrollYProgress,
        [end - 0.1, end],
        [1, 1]
    );

    return (
        <motion.div
            className={styles.cardWrapper}
            style={{
                y,
                scale,
                opacity,
                filter: brightness,
                zIndex: index
            }}
        >
            <div className={styles.card} style={{ backgroundColor: project.color }}>
                <div className={styles.imageContainer}>
                    <img src={project.image} alt={project.title} className={styles.image} />
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
