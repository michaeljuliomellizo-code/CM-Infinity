// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(
                name,
                value
              );

              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  /*
    =========================
    OBTENER USUARIO
    =========================
  */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /*
    =========================
    PROTEGER ADMIN
    =========================
  */

  const isAdminRoute =
    request.nextUrl.pathname.startsWith(
      "/admin"
    );

  if (isAdminRoute && !user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return response;
}

/*
  =========================
  MATCHER
  =========================
*/

export const config = {
  matcher: ["/admin/:path*"],
};