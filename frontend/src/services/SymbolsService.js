import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
// localhost:3001

export async function getSymbols(token) {
  const symbolsUrl = `${API_URL}/symbols`;
  const headers = {
    'authorization': token
  }
  const response = await axios.get(symbolsUrl, { headers });
  return response.data;
}

export async function getSymbol(symbol, token) {
  const symbolsUrl = `${API_URL}/symbols/${symbol}`;
  const headers = {
    'authorization': token
  }
  const response = await axios.get(symbolsUrl, { headers });
  return response.data;
}

export async function updateSymbol(symbolData, token) {
  const symbolUrl = `${API_URL}/symbols/${symbolData.symbol}`;
  const headers = {
    'authorization': token
  }
  const response = await axios.patch(symbolUrl, symbolData, { headers });
  return response.data;
}

export async function syncSymbols(token) {
  const symbolUrl = `${API_URL}/symbols/sync`;
  const headers = {
    'authorization': token
  }
  const response = await axios.post(symbolUrl, {}, { headers });
  return response.data;
}
