export async function analyze(image: string) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({
      image: {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
    }),
  });

  return await response.json();
}
