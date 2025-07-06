import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './Representantes.css'; // Importa el archivo CSS

gsap.registerPlugin(ScrollTrigger);

const Representantes = () => {
    const profileImagesContainerRef = useRef(null);
    const nameElementsRef = useRef([]); 
    const positionElementsRef = useRef([]); 
    const defaultNameHeadingRef = useRef(null); 

    const rumboBrasilRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const rumboTitleRef = useRef(null);
    const rumboSubtitleRef = useRef(null);
    const rumboTextRef = useRef(null);
    const rumboImageRef = useRef(null);

    const teamMembers = [
        { name: "Ana Torres", position: "Líder de Proyecto", imageUrl: "https://picsum.photos/id/400/300/300" },
        { name: "Luis Mendoza", position: "Ingeniero Aeroespacial", imageUrl: "https://picsum.photos/id/401/300/300" },
        { name: "Elena Ramos", position: "Diseñadora de Sistemas", imageUrl: "https://picsum.photos/id/402/300/300" },
        { name: "Jorge Soto", position: "Especialista en Propulsión", imageUrl: "https://picsum.photos/id/403/300/300" },
    ];

    // Ref para almacenar las instancias de SplitType para poder destruirlas/revertirlas
    const splitInstancesRef = useRef([]);
    // Ref para el timeline de texto activo (el que se está mostrando), para poder matarlo
    const activeTextTimeline = useRef(null);

    useEffect(() => {
        const profileImages = profileImagesContainerRef.current.querySelectorAll(".img");
        
        // Mapea las referencias a los elementos `h1` y `h2` reales
        const memberNameHeadings = nameElementsRef.current.slice(1).map(el => el && el.querySelector('h1')).filter(Boolean);
        const memberPositionHeadings = positionElementsRef.current.filter(Boolean);

        // --- Limpieza de SplitType en cada re-render ---
        splitInstancesRef.current.forEach(split => split.revert()); 
        splitInstancesRef.current = []; 

        // --- Inicialización de SplitType ---
        if (defaultNameHeadingRef.current) {
            const split = new SplitType(defaultNameHeadingRef.current, { types: 'chars' });
            split.chars.forEach((char) => {
                char.classList.add("letter");
            });
            splitInstancesRef.current.push(split); 
        }

        memberNameHeadings.forEach((heading) => {
            const split = new SplitType(heading, { types: 'chars' });
            splitInstancesRef.current.push(split); 
        });

        memberPositionHeadings.forEach((heading) => {
            const split = new SplitType(heading, { types: 'chars' });
            splitInstancesRef.current.push(split); 
        });
        // --- Fin Inicialización de SplitType ---


        const defaultLetters = defaultNameHeadingRef.current ? defaultNameHeadingRef.current.querySelectorAll(".char") : [];
        // Crea arrays de arrays de letras (cada sub-array son las letras de un nombre/cargo)
        const allMemberNamesLetters = memberNameHeadings.map(heading => heading.querySelectorAll(".char"));
        const allMemberPositionsLetters = memberPositionHeadings.map(heading => heading.querySelectorAll(".char"));

        // Inicializa el estado (oculta nombres y cargos de miembros, muestra el default)
        gsap.set(defaultLetters, { y: "0%" });
        allMemberNamesLetters.forEach(letters => gsap.set(letters, { y: "100%" }));
        allMemberPositionsLetters.forEach(letters => gsap.set(letters, { y: "100%" }));


        // Animación de la flecha palpitante
        gsap.to(".scroll-arrow", {
            y: 15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1
        });

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

        // --- Animaciones de hover en imágenes (REVISADO para evitar "pegado") ---
        if (window.innerWidth >= 900) {
            profileImages.forEach((img, index) => {
                const nameLetters = allMemberNamesLetters[index]; 
                const positionLetters = allMemberPositionsLetters[index]; 

                const handleMouseEnter = () => {
                    // Si hay un timeline de texto activo de un hover anterior, mátalo.
                    // Esto evita que las animaciones anteriores terminen "fuera de vista".
                    if (activeTextTimeline.current) {
                        activeTextTimeline.current.kill();
                        activeTextTimeline.current = null; // Resetea la referencia
                    }

                    // Crea un nuevo timeline para las animaciones de texto actuales
                    const tl = gsap.timeline();

                    // Oculta "Representantes" (o asegúrate de que esté oculto si ya lo estaba)
                    tl.to(defaultLetters, {
                        y: "100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: { each: 0.025, from: "center" }
                    }, 0); // Inicia en 0 (inmediatamente)

                    // Oculta cualquier otro nombre/cargo de miembro que pueda estar visible
                    // NO usar allMemberNamesLetters.forEach(letters => gsap.to(letters, ...)) aquí
                    // porque eso crearía nuevos tweens que competirían.
                    // En su lugar, asegúrate de que el timeline anterior haya sido matado,
                    // y los elementos ya estarán en y: "100%" o se irán a "100%" por el nuevo timeline
                    // si aún no lo están.

                    // Anima el nombre
                    tl.to(nameLetters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: { each: 0.025, from: "center" }
                    }, "<"); // Inicia al mismo tiempo que el anterior (defaultLetters)

                    // Anima el cargo
                    tl.to(positionLetters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: { each: 0.02, from: "center" },
                        delay: 0.1 // Aparece un poco después del nombre
                    }, "<"); // Inicia al mismo tiempo que el nombre

                    activeTextTimeline.current = tl; // Guarda el timeline activo

                    // Animación de la imagen (separada del timeline de texto, es más simple)
                    gsap.to(img, {
                        width: 250,
                        height: 250,
                        duration: 0.5,
                        ease: "power4.out"
                    });
                };

                const handleMouseLeave = () => {
                    // Mata la animación de la imagen al salir
                    gsap.killTweensOf(img); 
                    gsap.to(img, {
                        width: 200,
                        height: 200,
                        duration: 0.5,
                        ease: "power4.out"
                    });

                    // Crea un timeline para ocultar el nombre y cargo de la imagen que se acaba de dejar
                    const tl = gsap.timeline();

                    tl.to(nameLetters, {
                        y: "100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: { each: 0.025, from: "center" }
                    }, 0);

                    tl.to(positionLetters, {
                        y: "100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: { each: 0.02, from: "center" }
                    }, "<"); // Al mismo tiempo que el nombre

                    // No actualizamos activeTextTimeline aquí, ya que este timeline solo oculta.
                    // El `handleContainerMouseLeave` o un nuevo `handleMouseEnter` se encargará de mostrar el siguiente.
                };

                img.addEventListener("mouseenter", handleMouseEnter);
                img.addEventListener("mouseleave", handleMouseLeave);

                return () => {
                    img.removeEventListener("mouseenter", handleMouseEnter);
                    img.removeEventListener("mouseleave", handleMouseLeave);
                };
            });

            const handleContainerMouseLeave = () => {
                // Cuando el mouse sale del contenedor COMPLETO, muestra "Representantes"
                
                // Si hay un timeline de texto activo, mátalo para asegurar un reinicio limpio
                if (activeTextTimeline.current) {
                    activeTextTimeline.current.kill();
                    activeTextTimeline.current = null;
                }

                // Oculta explícitamente TODOS los nombres y cargos de los miembros (poniéndolos en su estado oculto)
                // Esto es crucial para que no haya textos "a medio aparecer" de interacciones rápidas previas.
                allMemberNamesLetters.forEach(letters => gsap.set(letters, { y: "100%" }));
                allMemberPositionsLetters.forEach(letters => gsap.set(letters, { y: "100%" }));


                // Anima "Representantes" de vuelta a la vista
                gsap.to(defaultLetters, {
                    y: "0%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center"
                    }
                });
            };

            profileImagesContainerRef.current.addEventListener("mouseleave", handleContainerMouseLeave);

            return () => {
                if (profileImagesContainerRef.current) {
                    profileImagesContainerRef.current.removeEventListener("mouseleave", handleContainerMouseLeave);
                }
            };
        }

        // --- Limpieza general al desmontar el componente ---
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill()); 
            splitInstancesRef.current.forEach(split => split.revert()); 
            splitInstancesRef.current = [];
            // Mata cualquier timeline de GSAP que aún esté activo (aunque `activeTextTimeline` ayuda mucho)
            if (activeTextTimeline.current) {
                activeTextTimeline.current.kill();
                activeTextTimeline.current = null;
            }
            gsap.globalTimeline.clear(); // Limpia el timeline global de GSAP
        };
    }, []); 

    return (
        <div className="page4 min-h-screen flex flex-col items-center">
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

            {/* Indicador de Scroll "Equipo GIA" */}
            <div ref={scrollIndicatorRef} className="scroll-indicator w-full bg-white flex flex-col justify-center items-center text-black"> 
                <span className="scroll-arrow">↓</span> 
                <p className="font-bold mt-4">EQUIPO GIA</p> 
            </div>

            {/* Sección de Representantes */}
            <section className="team w-full min-h-screen flex flex-col justify-center items-center bg-white text-black">
                <div className="profile-images" ref={profileImagesContainerRef}>
                    {teamMembers.map((member, index) => (
                        <div className="img" key={index}>
                            <img src={member.imageUrl} alt={member.name} />
                        </div>
                    ))}
                </div>

                <div className="profile-names">
                    {/* Título por defecto */}
                    <div className="name default">
                        <h1 ref={defaultNameHeadingRef}>Representantes</h1>
                    </div>
                    {/* Nombres y cargos de los miembros del equipo */}
                    {teamMembers.map((member, index) => (
                        <div className="name" key={index} ref={el => nameElementsRef.current[index + 1] = el}>
                            <h1>{member.name}</h1>
                            <h2 ref={el => positionElementsRef.current[index] = el}>{member.position}</h2>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Representantes;