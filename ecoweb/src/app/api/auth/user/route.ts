
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('http://localhost:8000/api/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}


export async function PUT(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const backendRes = await fetch('http://localhost:8000/api/user/profile', {
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
