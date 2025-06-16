
export async function GET(request) {
  return new Response("Hello, World!");
}

export async function POST(request) {
  const data = await request.json();
  return new Response(`Hello, ${data.name || "World"}!`);
}