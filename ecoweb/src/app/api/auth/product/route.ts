import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const body = await request.json();

    const backendRes = await fetch('http://localhost:8000/api/product', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = request.cookies.get('token')?.value;

    // Construye la URL para tu backend externo
    const backendUrl = new URL('http://localhost:8000/api/product');
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.append(key, value);
    });

    const backendRes = await fetch(backendUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!backendRes.ok) {
      throw new Error(`Backend error: ${backendRes.status}`);
    }

    const data = await backendRes.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}


export async function GETId(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;

    const backendRes = await fetch(`http://localhost:8000/api/product/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}
export async function PUTId(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;
    const body = await request.json();

    const backendRes = await fetch(`http://localhost:8000/api/product/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}


export async function DELETEId(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;

    const backendRes = await fetch(`http://localhost:8000/api/product/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function PATCHProductImage(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;
    const formData = await request.formData();

    const backendForm = new FormData();
    const image = formData.get('image');
    if (image) {
        backendForm.append('image', image);
    }

    const backendRes = await fetch(`http://localhost:8000/api/product/${id}/addimage`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: backendForm as BodyInit,
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function POSTID(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get('token')?.value;
    const { id } = params;
    const body = await request.json();

    const backendRes = await fetch(`http://localhost:8000/api/product/${id}/review`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
}

export async function DELETEReview(request: NextRequest, {params}: {params : {idProduct : string, idReview: string}}) {
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
