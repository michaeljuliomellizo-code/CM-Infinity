
"use client";
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import EstimateForm from '@/components/EstimateForm'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import Reel from '@/components/Reel'
import Reel2 from '@/components/Reel2'
import { useState } from 'react'
import Map from '@/components/Map';



export default function Home() {

  const [showForm, setShowForm] = useState(false)

  return (
    <main>

      <Hero onEstimateClick={() => setShowForm(true)} />


      <Services />
      
	    <Reel />
      <Reel2 />
      
      {showForm && (
        <div className="bg-black py-24 px-8">
          <EstimateForm />
        </div>
      )}

        <div className="bg-black text-center mb-8">
          <h2 className="bg-black text-3xl font-bold text-center text-white">1 Kitty Ln Taylors</h2>
        </div>
        <div className="max-w-5xl mx-auto">
          <Map />
        </div>
      
      <Testimonials />

      <Footer />

    </main>
  )
}