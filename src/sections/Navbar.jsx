import React, { useEffect, useRef, useState } from 'react'
import { navLinks, socials } from '../constants'
import { Link } from 'react-scroll'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
    const topLineRef = useRef(null)
    const bottomLineRef = useRef(null)
    const navRef = useRef(null)
    const linksRef = useRef([])
    const contactRef = useRef(null)

    const iconTl = useRef(null)
    const tl = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    const [showBurger, setShowBurger] = useState(true)

    // GSAP Animation
    useGSAP(() => {
        // 메뉴 패널 애니메이션
        // set(): 초기 상태 설정
        gsap.set(navRef.current, { xPercent: 100 })
        gsap.set([linksRef.current, contactRef.current], {
            autoAlpha: 0,  // 0 -> 안보임, 1 -> 보임
            x: -20,
        })

        tl.current = gsap.timeline({
            paused: true,
        })
            .to(navRef.current, { xPercent: 0, duration: 1, ease: 'power3.out' })
            .to(linksRef.current, {
                autoAlpha: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out'
            }, '<')
            .to(contactRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '<+0.2')  // 진행 효과가 0.2초 뒤에 시작(디폴트 보다는 빨리 실행)

        // 햄버거 아이콘 애니메이션
        iconTl.current = gsap.timeline({
            paused: true,  // 멈춰 있다가 play()가 실행되면 재생
        })
            .to(topLineRef.current, { rotate: 45, y: 3.3, duration: 0.3, ease: 'power2.inOut' })
            .to(bottomLineRef.current, { rotate: -45, y: -3.3, duration: 0.3, ease: 'power2.inOut' }, '<')  // 이전 애니메이션과 동시에 시작
    }, [])

    useEffect(() => {
        let lastScrollY = window.scrollY
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            // console.log(currentScrollY)

            setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10)

            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, {
            passive: true,  // 스크롤 이벤트 부드럽게
        })

        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    // 1. 메뉴 닫힘 -> 열림
    // 2. 클릭 시점 -> false
    // 3. 실행 -> play()
    // 4. 상태 변경 -> true
    const toggleMenu = () => {
        if (isOpen) {
            iconTl.current.reverse()  // 애니메이션 원복
            tl.current.reverse()
        } else {
            iconTl.current.play()  // 애니메이션 시작
            tl.current.play()
        }
        setIsOpen(!isOpen)
    }

    return (
        <>
            <nav className='fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2' ref={navRef}>
                <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
                    {navLinks.map((section, index) => (
                        <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                            <Link
                                className='transition-all duration-300 cursor-pointer hover:text-white'
                                smooth
                                offset={0}
                                duration={1500}
                                to={`${section}`}
                            >
                                {section}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col flex-wrap justify-between gap-8 md:flex-row'
                    ref={contactRef}>
                    <div className='font-light'>
                        <p className='tracking-wider text-white/50'>E-mail</p>
                        <p className='text-xl tracking-widest lowercase text-pretty'>mspark@gmail.com</p>
                    </div>
                    <div className='font-light'>
                        <p className='tracking-wider text-white/50'>Social Media</p>
                        <div className='flex flex-col flex-wrap md:flex-row gap-x-2'>
                            {socials.map((social, index) => (
                                <a href={social.href} className='text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300' key={index}>
                                    {'{ '} {social.name} {' }'}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <div className='fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10' style={showBurger ? { clipPath: 'circle(50% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }} onClick={toggleMenu}>
                <span className='block w-8 h-0.5 bg-white rounded-full origin-center'
                    ref={topLineRef}></span>
                <span className='block w-8 h-0.5 bg-white rounded-full origin-center'
                    ref={bottomLineRef}></span>
            </div>
        </>
    )
}

export default Navbar