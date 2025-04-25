'use server';

export async function getGoogleApiKey() {
  const key = process.env.GOOGLE_MAPS_API_KEY;

  return key;
}
