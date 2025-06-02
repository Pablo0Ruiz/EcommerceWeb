import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: { idProduct: string, idReview: string } }) {
    const token = request.cookies.get('token')?.value;
    const { idProduct } = params;
    const { idReview } = params;

    const backendRes = await fetch(`http://localhost:8000/api/product/${idProduct}/review/${idReview}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}