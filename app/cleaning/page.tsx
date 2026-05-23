import Image from 'next/image'
import Footer from '@/components/Footer'


export default function CleaningPage() {

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}

      <section className="relative h-[80vh]">

        <Image
          src="/images/cleaning.jpeg"
          alt="Cleaning Services"
          fill
          priority
          className="object-cover brightness-50"
        />

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="text-center px-6">

            <h1 className="text-6xl md:text-7xl font-black">
              Professional Cleaning Services
            </h1>

            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto">
              Residential & Commercial Cleaning Services
              in South Carolina & Charlotte.
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">

              <button className="bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-10 py-5 rounded-full">
                Get Free Estimate
              </button>

              <button className="border border-white hover:bg-white hover:text-black transition px-10 py-5 rounded-full">
                Book Cleaning Today
              </button>

            </div>

            <p className="mt-8 text-2xl font-bold">
              📞 864-404-6175
            </p>

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="py-24 px-8 bg-zinc-950">

        <h2 className="text-5xl font-bold text-center mb-16">
          Cleaning Services
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

          {[
            'House Cleaning',
            'Apartment Cleaning',
            'Office Cleaning',
            'Deep Cleaning',
            'Move Out Cleaning',
          ].map((service) => (

            <div
              key={service}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-bold">
                {service}
              </h3>
            </div>

          ))}

        </div>

      </section>

      {/* FORM */}

      <section className="bg-zinc-100 py-24 px-6">

        

      </section>

      {/* TESTIMONIALS */}

      <section className="bg-zinc-950 py-24 px-8">

        <h2 className="text-5xl font-bold text-center mb-16">
          Testimonials
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 p-8 rounded-3xl">
            ⭐ Excellent cleaning service and amazing attention to detail.
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            ⭐ Very professional and always on time.
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            ⭐ Highly recommended for residential and commercial cleaning.
          </div>

        </div>

      </section>

      {/* FOOTER */}

      <Footer />

    </main>
  )
}