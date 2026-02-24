import React, { useRef, useState } from 'react'
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { projects } from '../constants';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Works = () => {
    const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;
    const overlayRefs = useRef([])
    const previewRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(null)

    const mouse = useRef({ x: 0, y: 0 })
    const moveX = useRef(null)
    const moveY = useRef(null)

    useGSAP(() => {
        moveX.current = gsap.quickTo(previewRef.current, 'x', {
            duration: 1.5,
            ease: 'power3.out'
        })
        moveY.current = gsap.quickTo(previewRef.current, 'y', {
            duration: 2,
            ease: 'power3.out'
        })

        gsap.from('#project', {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 0.3,
            ease: 'back.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '#project',
                markers: false,
                start: 'top 80%'
            }
        })
    }, [])

    const handleMouseEnter = (index) => {
        if (window.innerWidth < 768) return
        setCurrentIndex(index)

        const el = overlayRefs.current[index]
        if (!el) return

        gsap.killTweensOf(el)
        gsap.fromTo(el, {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
        }, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.2,
            ease: 'power2.out',
        })
        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleMouseLeave = (index) => {
        if (window.innerWidth < 768) return
        setCurrentIndex(null)

        const el = overlayRefs.current[index]
        if (!el) return

        gsap.killTweensOf(el)
        gsap.to(el, {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            duration: 0.2,
            ease: 'power2.in',
        })
        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
        })
    }

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return

        mouse.current.x = e.clientX + 24
        mouse.current.y = e.clientY + 24

        moveX.current(mouse.current.x)
        moveY.current(mouse.current.y)
    }

    return (
        <section id='work'>
            <AnimatedHeaderSection
                subTitle={'Logic meets Aesthentics, Seamlessly'}
                title={'Works'}
                text={text}
                textColor={'text-black'}
                withScrollTrigger={true} />

            <div className='relative flex flex-col font-light' onMouseMove={handleMouseMove}>
                {projects.map((project, index) => (
                    <div key={project.id} className='relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0'
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        id='project'>
                        {/* overlay */}
                        <div className='absolute inset-0 md:block duration-200 bg-black -z-10 clip-path hidden' ref={(el) => {
                            overlayRefs.current[index] = el
                        }} />

                        {/* title */}
                        <div className='flex justify-between px-10 text-black transition-all duration-400 md:group-hover:px-12 md:group-hover:text-white'>
                            <h2 className='lg:text-[32px] text-[26px] leading-none'>{project.name}</h2>
                            <Icon icon='lucide:arrow-up-right' className='md:size-6 size-5' />
                        </div>

                        {/* divider */}
                        <div className='w-full h-0.5 bg-black/80' />

                        {/* frameworks */}
                        <div className='flex px-10 text-xs leading-loose uppercase transition-all duration-400 md:text-sm gap-x-5 md:group-hover:px-12'>
                            {project.frameworks.map((framework) => (
                                <p key={framework.id} className='text-black transition-all duration-400 md:group-hover:text-white'>
                                    {framework.name}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}

                {/* desktop Floating preview image */}
                <div className='fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[800px] md:block hidden opacity-0'
                    ref={previewRef}>
                    {currentIndex !== null && (
                        <img src={projects[currentIndex].image}
                            alt="preview image"
                            className='object-cover w-full h-full' />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Works