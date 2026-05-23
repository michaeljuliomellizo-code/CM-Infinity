import Image from 'next/image'

const services = [
  {
    title: 'Elegant Fences',
    image: '/images/fence.jpeg',
  },
  {
    title: 'Modern Decks',
    image: '/images/deck.jpeg',
  },
  {
    title: 'Professional Painting',
    image: '/images/painting.jpeg',
  },
  {
    title: 'Professional Cleaning Services',
    image: '/images/cleaning.jpg',
  },
]

export default function Services() {
  return (
    <section className="bg-zinc-950 text-white py-24 px-8">

      <h2 className="text-5xl font-bold text-center mb-20">
        Our Services
      </h2>

      <div className="grid md:grid-cols-4 gap-10">

        {services.map((service) => (
          <div
            key={service.title}
            className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition duration-500"
          >

            <Image
              src={service.image}
              alt={service.title}
              width={700}
              height={500}
              className="h-80 object-cover"
            />

            <div className="p-8">
              <h3 className="text-3xl font-bold">
                {service.title}
              </h3>
            </div>

          </div>
        ))}

      </div>

    </section>
  )
}