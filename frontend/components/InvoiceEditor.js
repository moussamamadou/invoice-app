import { Form, Formik } from 'formik';
import React, { useState,useEffect } from 'react'
import {MyInput, MySelect, MyAddressInput, MyItemInput} from "./customField"
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { updateInvoice, addInvoice } from "../pages/api/invoice"

const now = () => `${new Date().getFullYear()}-${('0' + new Date().getMonth()).slice(-2)}-${new Date().getDate()}`
const randomRef = () => (Math.random().toString(36).substring(2,4) +(Math.floor(Math.random() * 10000) + 10000).toString().substring(1)).toUpperCase()

const invoiceSchema = Yup.object().shape({
  clientName: Yup.string().min(4, 'At 4 least Character').required(`Client's name is required`),
  clientEmail: Yup.string().email('Invalid email').required(`Client's mail is required`),
  invoiceDate: Yup.date().required('Issue Date is required'),
  paymentTerms: Yup.number('Payment Terms most be a number of days').required('Payments Terms is required'),
  projectDescription: Yup.string().min(8, 'At 8 least Character').required('Project Description is required'),
  items: Yup.array()
            .of(
              Yup.object().shape({
                name:Yup.string().required(),
                quantity:Yup.number().min(1).required(),
                price:Yup.number().min(0).required()
              })
            )
            .required('Item List is required')
            .min(1, 'At least one item.'),
  status: Yup.string().required()
})

export default function InvoiceEditor({isNew, invoice, user }) {
  const router = useRouter();
  
  const [typeEditor, setTypeEditor] = useState('add');

  let invoiceValue;
    invoiceValue = { 
      addressFrom: {
      street: invoice?.addressFrom?.street || '', 
      city: invoice?.addressFrom?.city || '', 
      postCode: invoice?.addressFrom?.postCode || '', 
      country: invoice?.addressFrom?.country || '',
      },
      addressTo:{         
      street: invoice?.addressTo?.street || '', 
      city: invoice?.addressTo?.city || '', 
      postCode: invoice?.addressTo?.postCode || '', 
      country: invoice?.addressTo?.country || '',
      },
    clientName: invoice?.clientName || '',
    clientEmail: invoice?.clientEmail || '',
    invoiceDate: invoice?.invoiceDate || now(),
    paymentTerms: invoice?.paymentTerms || 30,
    projectDescription: invoice?.projectDescription || '',
    items: invoice?.items?.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })) || [{ 
      name: '', 
      quantity:1, 
      price: 0.00
    }],
    status: invoice?.status || 'draft',
    reference: invoice?.reference || '',
    id: invoice?.id || '',
    author: {id : invoice?.author?.id || ''},
  };

  const handleSubmit = (values, {setSubmitting, resetForm}) => {
        
    if (typeEditor === 'add'){
      const response = addInvoice(user, values)
        .then(res => router.push(`/invoice/${res.id}`))
        .catch(error => console.log(res))   
    } else if (typeEditor === 'update'){
      const response = updateInvoice(user, values.id, values)
        .then(res => router.reload(`/invoice/${values.id}`))
        .catch(error => console.log(res))   
    }

    setSubmitting(false);
    resetForm();    
  }

  return (
    <div className="">
        <h2>{isNew ? `New Invoice` : `Edit #${invoice.reference}`}</h2>
        <Formik             
          initialValues={invoiceValue}
          validationSchema={invoiceSchema}
          onSubmit={handleSubmit}
        >
          {({values, ...props}) => (
            <Form>                       
              <h4 className="color-primary">Bill From</h4>
              <MyAddressInput 
                street="addressFrom.street" 
                postCode="addressFrom.postCode" 
                city="addressFrom.city" 
                country="addressFrom.country" 
              />
              <h4 className="color-primary">Bill To</h4>
              <MyInput 
                label="Client's Name"
                name="clientName"
                type="text"
              />
              <MyInput 
                label="Client's Email"
                name="clientEmail"
                type="email"
              />
              <MyAddressInput 
                street="addressTo.street" 
                postCode="addressTo.postCode" 
                city="addressTo.city" 
                country="addressTo.country"
              />
              <MyInput
                label="Issue Date"
                name="invoiceDate"
                type="date"
              />
              <MySelect 
                label='Payments Terms'
                name='paymentTerms'
              />
              <MyInput
                label="Project Description"
                name="projectDescription"
                type="text"
              />
              <h3>Item List</h3> 
              <MyItemInput items={values.items}/>
              {
                isNew ? 
                  <div className="btn-primary-primary-primary-primary-primary-wrapper">
                    <button 
                      type="button"
                      className="btn-default" 
                      onClick={() => props.resetForm()}
                    >
                      Discard</button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      onClick={() => {
                        setTypeEditor('add');
                        props.setFieldValue('reference', randomRef());
                        props.setFieldValue('status', 'draft')
                      }}
                    >
                      Save as Draft
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      onClick={() => {
                        setTypeEditor('add');
                        props.setFieldValue('reference',randomRef());
                        props.setFieldValue('status', 'pending')
                      }}
                    >
                      Save & Send
                    </button>
                  </div>
                :
                  <div className="btn-primary-wrapper">
                    <button 
                      type="submit" 
                      className="btn-default" 
                      onClick={() => props.resetForm()}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      onClick={() => setTypeEditor('update')}
                    >
                      Save Changes
                    </button>
                  </div> 
              }
            </Form>
          )}
        </Formik>
    </div>
  )
}
