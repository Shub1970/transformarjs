"use server";

export async function getRequest(url: string) {
  try {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_API}${url}`;
    console.log("apiUrl", apiURL);
    const response = await fetch(apiURL, {
      method: "get",
      headers: headers,
      cache: "no-cache",
    });
    if (!response.ok) {
      const error_text = await response.text();
      throw new Error(
        `failed to fetch data from ${url} - status: ${response.status}, Response:${error_text}`,
      );
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
}
