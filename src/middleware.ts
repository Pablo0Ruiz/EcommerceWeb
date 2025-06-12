

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value


    if (!token) {

        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    try {
        const { payload } = await jwtVerify(token, SECRET)

        const role = payload.role as string


        if (pathname.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }

        if (pathname.startsWith('/seller-admin') && !['admin', 'seller'].includes(role)) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        if (pathname.startsWith('/user') && !['admin','user','seller'].includes(role)) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }

        return NextResponse.next()
    } catch (err) {
        console.error('❌ Token inválido:', err)
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
        // '/market',
        // '/market/:path*',
        '/seller-admin',
        '/seller-admin/:path*',
        '/user',
        '/user/:path*',
    ],
}