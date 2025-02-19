"useClient"

import { type NextRequest, NextResponse, type MiddlewareConfig } from "next/server"


const publicRoutes = [
    { path: "/auth" , whenAuthenticated: "redirect" }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICADED_ROUTE = "/auth"



export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    const publicRoute =  publicRoutes.find(route => route.path === path)

    const token = request.cookies.get("token")?.value

    if ( !token && publicRoute ) return NextResponse.next()

    if ( !token && !publicRoute ) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICADED_ROUTE

        return NextResponse.redirect(redirectUrl)
    }

    if ( token && publicRoute && publicRoute.whenAuthenticated === "redirect" ) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = "/"

        return NextResponse.redirect(redirectUrl)
    }

    if ( token  && !publicRoute ){
        //  chekc if token is not expired

        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      ],
}
