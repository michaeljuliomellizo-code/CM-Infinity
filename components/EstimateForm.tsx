'use client'

import { useState } from 'react'

export default function EstimateForm() {

  // SERVICE
  const [service, setService] = useState('')

  // CUSTOMER
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  // FENCE
  const [fenceType, setFenceType] = useState('')
  const [linearFeet, setLinearFeet] = useState('')
  const [gateType, setGateType] = useState('')

  // DECK
  const [deckSize, setDeckSize] = useState('')

  // PAINTING
  const [paintingType, setPaintingType] = useState('')
  const [squareFootage, setSquareFootage] = useState('')

  // CLEANING
  const [cleaningTypes, setCleaningTypes] = useState<string[]>([])

  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')

  const [cleaningCondition, setCleaningCondition] = useState('')

  const [frequency, setFrequency] = useState('')

  const [additionalServices, setAdditionalServices] = useState<string[]>([])

  // SUBMIT

  const submitEstimate = async () => {

    const response = await fetch('/api/estimate', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({

        service,

        name,
        phone,
        email,
        address,

        fence_type: fenceType,
        linear_feet: linearFeet,
        gate_type: gateType,

        deck_size: deckSize,

        painting_type: paintingType,
        square_footage: squareFootage,

        cleaning_types: cleaningTypes,

        bedrooms,
        bathrooms,

        cleaning_condition: cleaningCondition,

        frequency,

        additional_services: additionalServices,
      }),
    })

    if (response.ok) {

      alert('Estimate Submitted')

      // RESET FORM

    setService('')

    setName('')
    setPhone('')
    setEmail('')
    setAddress('')

    setFenceType('')
    setLinearFeet('')
    setGateType('')

    setDeckSize('')

    setPaintingType('')
    setSquareFootage('')

    setCleaningTypes([])

    setBedrooms('')
    setBathrooms('')

    setCleaningCondition('')

    setFrequency('')

    setAdditionalServices([])

    } else {

      alert('Something went wrong')
    }
  }

  return (

    <section
      id="estimate-form"
      className="bg-white p-10 rounded-3xl max-w-5xl mx-auto"
    >

      <h2 className="text-5xl font-bold mb-12 text-center">
        Get Your Free Estimate
      </h2>

      {/* SERVICES */}

      <div className="grid md:grid-cols-4 gap-4">

        {['Fence', 'Deck', 'Painting', 'Cleaning'].map((item) => (

          <button
            key={item}

            onClick={() => setService(item)}

            className={`border p-6 rounded-2xl transition ${
              service === item
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* FENCE */}

      {service === 'Fence' && (

        <div className="mt-10 space-y-6">

          <select
            value={fenceType}

            onChange={(e) => setFenceType(e.target.value)}

            className="border p-4 rounded-xl w-full"
          >

            <option value="">Select Fence Type</option>

            <option>Privacy Fence 6ft</option>

            <option>Privacy Fence 8ft</option>

            <option>Charleston Fence</option>

            <option>Vinyl Fence</option>


          </select>
          
          <input
            type="text"

            placeholder="Linear Feet"

            value={linearFeet}

            onChange={(e) => setLinearFeet(e.target.value)}

            className="border p-4 rounded-xl w-full"
          />

          <select
            value={gateType}

            onChange={(e) => setGateType(e.target.value)}

            className="border p-4 rounded-xl w-full"
          >
            <option value="">Gates</option>

            <option>1</option>

            <option>2</option>

            <option>Double Gate</option>

          </select>

        </div>
      )}

      {/* DECK */}

      {service === 'Deck' && (

        <div className="mt-10">

          <input
            type="text"

            placeholder="Deck Size"

            value={deckSize}

            onChange={(e) => setDeckSize(e.target.value)}

            className="border p-4 rounded-xl w-full"
          />

        </div>
      )}

      {/* PAINTING */}

      {service === 'Painting' && (

        <div className="mt-10 space-y-6">

          <select
            value={paintingType}

            onChange={(e) => setPaintingType(e.target.value)}

            className="border p-4 rounded-xl w-full"
          >

            <option value="">Select Painting Type</option>

            <option>Interior</option>

            <option>Exterior</option>

          </select>

          <input
            type="text"

            placeholder="Square Footage"

            value={squareFootage}

            onChange={(e) => setSquareFootage(e.target.value)}

            className="border p-4 rounded-xl w-full"
          />

        </div>
      )}

      {/* CLEANING */}

      {service === 'Cleaning' && (

        <div className="mt-12">

          {/* CLEANING TYPES */}

          <div className="mb-12">

            <h3 className="text-2xl font-bold mb-6">
              Cleaning Type
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

              {[
                'House Cleaning',
                'Apartment Cleaning',
                'Office Cleaning',
                'Deep Cleaning',
                'Move Out Cleaning'
              ].map((item) => (

                <label
                  key={item}
                  className="border p-5 rounded-2xl cursor-pointer"
                >

                  <input
                    type="checkbox"

                    className="mr-3"

                    onChange={(e) => {

                      if (e.target.checked) {

                        setCleaningTypes([
                          ...cleaningTypes,
                          item
                        ])

                      } else {

                        setCleaningTypes(
                          cleaningTypes.filter(
                            (type) => type !== item
                          )
                        )
                      }
                    }}
                  />

                  {item}

                </label>

              ))}

            </div>

          </div>

          {/* PROPERTY SIZE */}

          <div className="mb-12">

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"

                placeholder="Bedrooms"

                value={bedrooms}

                onChange={(e) => setBedrooms(e.target.value)}

                className="border p-5 rounded-2xl"
              />

              <input
                type="text"

                placeholder="Bathrooms"

                value={bathrooms}

                onChange={(e) => setBathrooms(e.target.value)}

                className="border p-5 rounded-2xl"
              />

            </div>

          </div>

          {/* CONDITION */}

          <div className="mb-12">

            <h3 className="text-2xl font-bold mb-6">
              Cleaning Condition
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              {[
                'Light Cleaning',
                'Standard Cleaning',
                'Deep Cleaning'
              ].map((item) => (

                <label
                  key={item}
                  className="border p-5 rounded-2xl cursor-pointer"
                >

                  <input
                    type="radio"

                    name="condition"

                    className="mr-3"

                    onChange={() =>
                      setCleaningCondition(item)
                    }
                  />

                  {item}

                </label>

              ))}

            </div>

          </div>

          {/* FREQUENCY */}

          <div className="mb-12">

            <h3 className="text-2xl font-bold mb-6">
              Frequency
            </h3>

            <div className="grid md:grid-cols-4 gap-4">

              {[
                'One Time',
                'Weekly',
                'Bi-Weekly',
                'Monthly'
              ].map((item) => (

                <label
                  key={item}
                  className="border p-5 rounded-2xl cursor-pointer"
                >

                  <input
                    type="radio"

                    name="frequency"

                    className="mr-3"

                    onChange={() =>
                      setFrequency(item)
                    }
                  />

                  {item}

                </label>

              ))}

            </div>

          </div>

        </div>
      )}

      {/* CUSTOMER */}

      <div className="mt-12 grid md:grid-cols-2 gap-6">

        <input
          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e) => setName(e.target.value)}

          className="border p-4 rounded-xl"
        />

        <input
          type="text"

          placeholder="Phone"

          value={phone}

          onChange={(e) => setPhone(e.target.value)}

          className="border p-4 rounded-xl"
        />

        <input
          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          className="border p-4 rounded-xl"
        />

        <input
          type="text"

          placeholder="Address"

          value={address}

          onChange={(e) => setAddress(e.target.value)}

          className="border p-4 rounded-xl"
        />

      </div>

      <button
        onClick={submitEstimate}

        className="mt-10 bg-black text-white px-10 py-5 rounded-full"
      >
        SUBMIT FREE ESTIMATE
      </button>

    </section>
  )
}