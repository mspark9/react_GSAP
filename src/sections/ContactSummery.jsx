import React, { useRef } from 'react'
import Marquee from '../components/Marquee'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ContactSummery = () => {
    const containerRef = useRef(null);
    const items = [
        'Innovation',
        'precision',
        'Trust',
        'Collaboration',
        'Excellence',
    ]
    const items2 = [
        'Contact Us',
        'Contact Us',
        'Contact Us',
        'Contact Us',
        'Contact Us',
    ]

    useGSAP(() => {
        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center center',
                end: '+=800 center',  // 800px 이후 스크롤동안 에니메이션 실행
                scrub: 0.5,  // 스크롤에 따라 부드러운 이동 -> 0.5초간 딜레이
                pin: true,  // start, end 사이에 화면 스크롤 고정
                pinSpacing: true,  // 고정된 동안 이전 섹션과 겹치지 않도록 간격 유지
                markers: false,
            }
        })
    }, [])
    return (
        <section className='flex flex-col items-center justify-between min-h-screen gap-12 mt-16' ref={containerRef}>
            <Marquee items={items} />
            <div className='overflow-hidden font-light text-center contact-text-responsive'>
                <p>
                    “ Let’s build a
                    <br />
                    <span className='font-normal'>memorable</span> &{' '}
                    <span className='italic'>inspiring</span>
                    <br />
                    Web application <span className='text-gold'>together</span> “
                </p>
            </div>
            <Marquee
                items={items2}
                reverse={true}
                className='text-black bg-transparent border-y-2'
                iconClassName='stroke-gold stroke-2 text-primary'
                icon='material-symbols-light:square'
            />
        </section>
    )
}

export default ContactSummery