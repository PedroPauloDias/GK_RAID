import axios from 'axios';

const baseUrl = 'https://raid-api.vercel.app/api';
export async function createAdmin(body){    
  const response = await axios.post(`${baseUrl}/register`, body)  
  return response;
}


export async function getAllAdmins() {
  const response = await axios.post(`${baseUrl}/login`);
  return response;
}