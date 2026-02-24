import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'

gsap.registerPlugin(ScrollTrigger)

const ServiceSummery = () => {
    useGSAP(() => {
        gsap.to('#title-service-1', {
            xPercent: 20,
            scrollTrigger: {
                trigger: '#title-service-1',
                scrub: true,  // 스크롤에 따라 부드럽게 이동
            }
        })

        gsap.to('#title-service-2', {
            xPercent: -30,
            scrollTrigger: {
                trigger: '#title-service-2',
                scrub: true,
            }
        })

        gsap.to('#title-service-3', {
            xPercent: 50,
            scrollTrigger: {
                trigger: '#title-service-3',
                scrub: true,
            }
        })

        gsap.to('#title-service-4', {
            xPercent: -50,
            scrollTrigger: {
                trigger: '#title-service-4',
                scrub: true,
            }
        })
    })

    return (
        <section className='mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive'>
            <div id='title-service-1'>
                <p>Architacture</p>
            </div>
            <div id='title-service-2' className='flex items-center justify-center gap-3 translate-x-16'>
                <p>Development</p>
                <div className='w-10 md:w-32 bg-gold h-1' />
                <p>Deployment</p>
            </div>
            <div id='title-service-3' className='flex items-center justify-center gap-3 -translate-x-48'>
                <p>APIs</p>
                <div className='w-10 md:w-32 bg-gold h-1' />
                <p className='italic'>Frontends</p>
                <div className='w-10 md:w-32 bg-gold h-1' />
                <p>Scalability</p>
            </div>
            <div id='title-service-4' className='translate-x-48'>
                <p>Databases</p>
            </div>
        </section>
    )
}

export default ServiceSummery