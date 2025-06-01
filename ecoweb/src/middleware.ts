

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
console.log('este es el secreto:',SECRET)

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value
    console.log('token middleware:',token)
    console.log('🔐 Middleware ejecutado en:', pathname)

    if (!token) {
        console.log('❌ Sin token')
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    try {
        const { payload } = await jwtVerify(token, SECRET)
        console.log('este es el payload:',payload)
        const role = payload.role as string
        console.log('este es el rol:',role)

        console.log('🎫 Usuario con rol:', role)

        // // 🔒 Protección específica por ruta
        // if (pathname.startsWith('/admin') && role !== 'admin') {
        //     return NextResponse.redirect(new URL('/auth/login', request.url))
        // }

        // if (pathname.startsWith('/market') && !['admin', 'user', 'seller'].includes(role)) {
        //     return NextResponse.redirect(new URL('/auth/login', request.url))
        // }

        return NextResponse.next()
    } catch (err) {
        console.error('❌ Token inválido:', err)
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: ['/admin', '/admin/:path*', '/market', '/market/:path*'],
}