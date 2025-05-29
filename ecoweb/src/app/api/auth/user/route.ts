import { getUserCookie } from '@/shared/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://localhost:8000/api/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function PUTRecoverPassword(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://localhost:8000/api/user/recover-psswd', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}
export async function PUTChangePassword(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://localhost:8000/api/user/changepswd', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function PUTProfile(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://localhost:8000//api/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}
export async function DELETE(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const id = getUserCookie()

    const backendRes = await fetch(`https://localhost:8000/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function PATCHImage(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const formData = await request.formData();

    const backendForm = new FormData();
    const image = formData.get('image');
    if (image) {
        backendForm.append('image', image);
    }

    const backendRes = await fetch('http://localhost:8000/api/user/addimage', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: backendForm as BodyInit,
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function PATCHRole(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('https://localhost:8000//api/user/updaterole', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}
//falta probar
export async function PATCHRestore(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const id = getUserCookie();

    const backendRes = await fetch(`https://localhost:8000//api/user/restore/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}


//de esta forma es como uso el fetch
// const handleClick = async () => {
//   const res = await fetch('/api/user-info', {
//     credentials: 'include', // manda cookie httpOnly automáticamente
//   });
//   const data = await res.json();
//   console.log(data);
// };
