import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RumboBrasil.css'; // Asegúrate de tener el CSS adecuado para los estilos

gsap.registerPlugin(ScrollTrigger);

const RumboBrasil = () => {

    const rumboBrasilRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const rumboTitleRef = useRef(null);
    const rumboSubtitleRef = useRef(null);
    const rumboTextRef = useRef(null);
    const rumboImageRef = useRef(null);

    useEffect(() => {
    
            // --- GSAP ScrollTrigger para la sección "RUMBO A BRASIL" (código sin cambios, es robusto) ---
            const createScrollTriggerAnimation = (targetRef, initialProps, finalProps, delay = 0, triggerStart = "top 80%") => {
                if (targetRef.current) {
                    gsap.fromTo(targetRef.current,
                        { opacity: 0, ...initialProps },
                        {
                            opacity: 1, ...finalProps,
                            duration: 1,
                            delay: delay,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: rumboBrasilRef.current,
                                start: triggerStart,
                                toggleActions: "play reverse play reverse",
                            }
                        }
                    );
                }
            };
    
            createScrollTriggerAnimation(rumboBrasilRef, { y: 100 }, { y: 0 }, 0, "top 80%");
            createScrollTriggerAnimation(rumboTitleRef, { x: -100 }, { x: 0 }, 0.2, "top 75%");
            createScrollTriggerAnimation(rumboSubtitleRef, { x: 100 }, { x: 0 }, 0.4, "top 70%");
            createScrollTriggerAnimation(rumboTextRef, { y: 50 }, { y: 0 }, 0.6, "top 65%");
            createScrollTriggerAnimation(rumboImageRef, { scale: 0.5 }, { scale: 1, ease: "back.out(1.7)" }, 0.8, "top 60%");
    
            if (scrollIndicatorRef.current) {
                gsap.fromTo(scrollIndicatorRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: scrollIndicatorRef.current,
                            start: "top 90%",
                            toggleActions: "play reverse play reverse",
                        }
                    }
                );
            }
        }, []); 

    return (
        <div className="page4 flex flex-col items-center">
            {/* Sección "RUMBO A BRASIL" */}
            <section ref={rumboBrasilRef} className="rumbo-a-brasil w-full min-h-[60vh] flex justify-center items-center bg-white text-black">
                <div className="rumbo-content">
                    <h1 ref={rumboTitleRef} className="rumbo-title">RUMBO A BRASIL</h1>
                    <h2 ref={rumboSubtitleRef} className="rumbo-subtitle">Latin America Space Challenge <br/> 6ta edición</h2>
                    <p ref={rumboTextRef} className="rumbo-text">
                        Oficialmente ya estamos dentro de la lista de participantes de esta nueva edición que se llevará a cabo entre el 5 y 8 de noviembre de 2025,
                        en las ciudades de Bauru e Iacanga en el estado de São Paulo, Brasil.
                    </p>
                </div>
                <div className="rumbo-image-container">
                    <img ref={rumboImageRef} src="/brasil-edition.png" alt="LASC Sixth Edition Rocket-Satellite" className="rumbo-image" />
                </div>
            </section>
        </div>
    );
};

export default RumboBrasil;