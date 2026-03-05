import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  try {
    const response = await fetch(`https://cloudflare-dns.com/query?name=${name}&type=A`, {
      headers: { 'Accept': 'application/dns-json' },
      next: { revalidate: 60 } // Cache hasil selama 60 detik
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'DNS Query Failed' }, { status: 500 });
  }
}
