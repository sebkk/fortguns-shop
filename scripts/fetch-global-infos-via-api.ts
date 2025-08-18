import axios from 'axios';

async function fetchGlobalInfosViaAPI(): Promise<void> {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/fetch-global-infos',
    );

    if (response.data.success) {
      return;
    } else {
      console.error('❌ Error:', response.data.error);
    }
  } catch (error) {
    console.error('❌ Error calling API route:', error);
  }
}

fetchGlobalInfosViaAPI();
