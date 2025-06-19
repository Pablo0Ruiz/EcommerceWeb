import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value
    const regEmail = request.cookies.get('regEmail')?.value

    // Si regEmail existe, es un usuario invitado y no puede acceder a rutas protegidas
    if (regEmail) {
        const url = new URL('/auth/login', request.url)
        url.searchParams.set('message', 'guest_restricted')
        return NextResponse.redirect(url)
    }

    // Si no hay token, redirigir a login
    if (!token) {
        const url = new URL('/auth/login', request.url)
        url.searchParams.set('message', 'no_token')
        return NextResponse.redirect(url)
    }

    // Si hay token, verificar normalmente
    try {
        const { payload } = await jwtVerify(token, SECRET)
        const role = payload.role as string

        if (pathname.startsWith('/admin') && !['admin'].includes(role)) {
            const url = new URL('/auth/login', request.url)
            url.searchParams.set('message', 'admin_access_denied')
            return NextResponse.redirect(url)
        }

        if (pathname.startsWith('/seller-admin') && !['admin', 'seller'].includes(role)) {
            const url = new URL('/auth/login', request.url)
            url.searchParams.set('message', 'seller_access_denied')
            return NextResponse.redirect(url)
        }
        
        if (pathname.startsWith('/user') && !['admin','user','seller'].includes(role)) {
            const url = new URL('/auth/login', request.url)
            url.searchParams.set('message', 'user_access_denied')
            return NextResponse.redirect(url)
        }

        return NextResponse.next()
    } catch (err) {
        console.error('❌ Token inválido:', err)
        
        // Si el token es inválido, borrar todas las cookies y redirigir
        const response = NextResponse.redirect(new URL('/auth/login?message=invalid_token', request.url))
        response.cookies.delete('token')
        response.cookies.delete('regEmail')
        response.cookies.delete('user')
        
        return response
    }
}

export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
        '/seller-admin',
        '/seller-admin/:path*',
        '/user',
        '/user/:path*',
    ],
}