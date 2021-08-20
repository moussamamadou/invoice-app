import axios from 'axios';

export function createStrapiAxios(user) {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: user && {
      Authorization: `Bearer ${user?.strapiToken}`,
    }
  })
}