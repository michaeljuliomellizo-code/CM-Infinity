'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero({ onEstimateClick }: { onEstimateClick: () => void }) {
  return (
    
    <section className="relative h-screen">
      <div className="absolute top-6 left-6 z-50">

        {/* LOGO */}

        <Image
          src="/images/logo.jpeg"
          alt="CM Infinity Logo"
          width={180}
          height={60}
          priority
        />

      </div>

      <Image
        src="/images/fence.jpeg"
        alt="Fence"
        fill
        priority
        className="object-cover brightness-50"
      />

       {/* HERO CONTENT */}

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="text-center text-white">

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl font-black"
          >
            CM Infinity Solutions LLC
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-2xl"
          >
            Fence • Deck • Painting • Cleaning
          </motion.p>

          <button onClick={() => {
    onEstimateClick()
    document.getElementById('estimate-form')?.scrollIntoView({ behavior: 'smooth' })
  }} className="mt-10 bg-yellow-500 hover:bg-yellow-400 transition px-10 py-5 rounded-full text-black font-bold">
            Get Free Estimate
          </button>

        </div>

      </div>

    </section>
  )
}