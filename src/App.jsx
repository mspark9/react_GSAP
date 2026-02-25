import React from 'react'
import Navbar from './sections/Navbar'
import ReactLenis from 'lenis/react'
import Hero from './sections/Hero'
import ServiceSummery from './sections/ServiceSummery'
import Services from './sections/Services'
import About from './sections/About'
import Works from './sections/Works'
import ContactSummery from './sections/ContactSummery'
import Contact from './sections/Contact'

const App = () => {
    return (
        <ReactLenis root className='relative w-screen min-h-screen'>
            <Navbar />
            <Hero />
            <ServiceSummery />
            <Services />
            <About />
            <Works />
            <ContactSummery />
            <Contact />
        </ReactLenis>
    )
}

export default App