import "dotenv/config";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  id_token?: string;
  refresh_token?: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture: string;
  locale?: string;
}

/**
 * Generate Google OAuth authorization URL
 */
export function getGoogleAuthURL(): string {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    access_type: "offline",
    prompt: "consent",
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

/**
 * Exchange authorization code for access tokens
 */
export async function getGoogleTokens(
  code: string,
): Promise<GoogleTokenResponse> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
    grant_type: "authorization_code",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(values).toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch Google tokens: ${response.status} - ${errorData}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting Google tokens:", error);
    throw error;
  }
}

/**
 * Get Google user info using access token
 */
export async function getGoogleUserInfo(
  access_token: string,
): Promise<GoogleUserInfo> {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch Google user info: ${response.status} - ${errorData}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting Google user info:", error);
    throw error;
  }
}
