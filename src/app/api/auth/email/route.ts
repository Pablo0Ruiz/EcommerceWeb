import { NextRequest,NextResponse } from "next/server";

export async function PUT (request: NextRequest){
    const token = request.cookies.get('token')?.value;
    const body = await request.json()
    const backendRes = await fetch('https://intelligent-karmen-areotar-52151d0d.koyeb.app/api/user/validation-mail',{
        method :'PUT',
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        });

        const data = await backendRes.json()

        return NextResponse.json(data)
}