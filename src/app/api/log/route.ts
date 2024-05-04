export async function POST(request: Request) {
  const log = await request.json();
  console.log("log: ", log);
  return Response.json(JSON.stringify(log));
}
