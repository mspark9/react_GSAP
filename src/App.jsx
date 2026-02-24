import React from 'react'
import Navbar from './sections/Navbar'
import ReactLenis from 'lenis/react'
import Hero from './sections/Hero'
import ServiceSummery from './sections/ServiceSummery'
import Services from './sections/Services'
import About from './sections/About'

const App = () => {
    return (
        <ReactLenis root className='relative w-screen min-h-screen'>
            <Navbar />
            <Hero />
            <ServiceSummery />
            <Services />
            <About />
            {/* <section id='home' className='h-screen bg-amber-500'></section> */}
            <section id='services' className='h-screen bg-indigo-500'></section>
            <section id='about' className='h-screen bg-gray-500'></section>
        </ReactLenis>
    )
}

export default App