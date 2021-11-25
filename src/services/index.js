const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

const fetchTokenApi = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT);
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export default fetchTokenApi;
