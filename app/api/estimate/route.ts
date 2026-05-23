import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'


const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const { error } = await supabase
      .from('estimates')
      .insert([body])

    if (error) {
      console.log(error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    await resend.emails.send({

      from: 'onboarding@resend.dev',

      to: 'michael.julio.mellizo@gmail.com',

      subject: 'New Estimate Request',

      html: `
        <h1>New Estimate</h1>

        <p><strong>Service:</strong> ${body.service}</p>

        <p><strong>Name:</strong> ${body.name}</p>

        <p><strong>Phone:</strong> ${body.phone}</p>

        <p><strong>Email:</strong> ${body.email}</p>

        <p><strong>Address:</strong> ${body.address}</p>

        <hr />

        <p><strong>Fence Type:</strong> ${body.fence_type || ''}</p>

        <p><strong>Linear Feet:</strong> ${body.linear_feet || ''}</p>

        <p><strong>Gates:</strong> ${body.gate_type || ''}</p>

        <p><strong>Deck Size:</strong> ${body.deck_size || ''}</p>

        <p><strong>Painting Type:</strong> ${body.painting_type || ''}</p>

        <p><strong>Square Footage:</strong> ${body.square_footage || ''}</p>

        <p><strong>Cleaning Types:</strong> ${body.cleaning_types?.join(', ') || ''}</p>

        <p><strong>Bedrooms:</strong> ${body.bedrooms || ''}</p>

        <p><strong>Bathrooms:</strong> ${body.bathrooms || ''}</p>

        <p><strong>Condition:</strong> ${body.cleaning_condition || ''}</p>

        <p><strong>Frequency:</strong> ${body.frequency || ''}</p>

        <p><strong>Additional Services:</strong> ${body.additional_services?.join(', ') || ''}</p>
      `
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    return NextResponse.json(
      { error: 'Server Error' },
      { status: 500 }
    )
  }
}