import nc from 'next-connect';
import { createStrapiAxios } from '../../utils/strapi';
import axios from 'axios';


export async function fetchAPI(path, user) {
  try{
  const response = await createStrapiAxios(user)
    .get(path)
    .then(res => res.data)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getInvoices(user) {
  try {
    const invoices = await fetchAPI("/invoices", user);
    return invoices;
  }catch (error) {
    console.log('getInvoice --',error);
  }
}

  export async function getInvoice(user, id) {
    try {
      const invoice = await fetchAPI(`/invoices/${id}`, user);
      return invoice;
    }catch (error) {
      console.log('getInvoice by id --',error); 
    }
  }
  
  export async function addInvoice(user, data) {
    try{
      const response = await createStrapiAxios(user)
        .post(`/invoices`, data)
        .then(res => res.data)
        return response;
      } catch (error) {
        console.log('addInvoice --', error);
      }
  }
  
  export async function updateInvoice(user,id, data) {
    try{
      const response = await createStrapiAxios(user)
        .put(`/invoices/${id}`, data)
        .then(res => res.data)
        return response;
      } catch (error) {
        console.log('updateInvoice --',error);
      }
  }

  export async function deleteInvoice(user,id) {
    try{
      const response = await createStrapiAxios(user)
        .delete(`/invoices/${id}`)
        .then(res => res.data)
        return response;
      } catch (error) {
        console.log('deleteInvoice --',error);
      }
  }