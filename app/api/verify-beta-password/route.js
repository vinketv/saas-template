export async function POST(request) {
  try {
    const res = await request.json();

    // Vérifiez si le nom d'utilisateur est fourni
    if (!res.password) {
      return new Response("Unlock beta error: please fill every input", {
        status: 400,
      });
    }

    console.log(password === process.env.BETA_PASSWORD);

    if (password === process.env.BETA_PASSWORD) {
      return new Response("Successful unlock beta!", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response({
      status: 401,
    });
  }
}
