import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request
) {
  const supabase =
    await createClient();

  const body =
    await request.json();

    console.log("BODY:", body);

  const {
    reviewId,
    approved,
    admin_reply,
  } = body;

  const updateData: {
    approved?: boolean;
    admin_reply?: string;
  } = {};

  if (
    approved !== undefined
  ) {
    updateData.approved =
      approved;
  }

  if (
    admin_reply !== undefined
  ) {
    updateData.admin_reply =
      admin_reply;
  }

 const { data, error } =
  await supabase
    .from("reviews")
    .update(updateData)
    .eq("id", reviewId)
    .select();

console.log(
  "UPDATE DATA:",
  updateData
);

console.log(
  "UPDATED ROW:",
  data
);

console.log(
  "ERROR:",
  error
);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}

export async function DELETE(
  request: Request
) {
  const supabase =
    await createClient();

  const {
    searchParams,
  } = new URL(
    request.url
  );

  const reviewId =
    searchParams.get(
      "reviewId"
    );

  if (!reviewId) {
    return NextResponse.json(
      {
        error:
          "reviewId required",
      },
      { status: 400 }
    );
  }

  await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);

  return NextResponse.json({
    success: true,
  });
}