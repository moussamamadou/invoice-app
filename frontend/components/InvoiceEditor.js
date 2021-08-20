import { Form, Formik } from 'formik';
import React, { useState,useEffect } from 'react'
import {MyInput, MySelect, MyAddressInput, MyItemInput} from "./customField"
import * as Yup from 'yup'

const now = () => `${new Date().getFullYear()}-${('0' + new Date().getMonth()).slice(-2)}-${new Date().getDate()}`

const initialValues = { 
  streetFrom: '', 
  cityFrom: '', 
  postCodeFrom: '', 
  countryFrom: '',
  clientName: '',
  email: '',
  streetTo: '', 
  cityTo: '', 
  postCodeTo: '', 
  countryTo: '',
  invoiceDate: now(),
  paymentTerms: 1,
  projectDescription: '',
  itemList: [
    { 
      name: '', 
      quantity:1, 
      price: 0.00
    }
  ],
  status: 'draft'
};

const invoiceSchema = Yup.object().shape({
  clientName: Yup.string().min(4, 'At 4 least Character').required(`Client's name is required`),
  email: Yup.string().email('Invalid email').required(`Client's mail is required`),
  invoiceDate: Yup.date().required('Issue Date is required'),
  paymentTerms: Yup.number('Payment Terms most be a number of days').required('Payments Terms is required'),
  projectDescription: Yup.string().min(8, 'At 8 least Character').required('Project Description is required'),
  itemList: Yup.array()
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

export default function InvoiceEditor({isNew, invoiceValues = initialValues}) {
  
  const handleSubmit = (values, {setSubmitting, resetForm, setFieldValue}) => {
    setSubmitting(false);
    resetForm();    
  }

  return (
    <div className="">
        <h2>{isNew ? `New Invoice` : `Edit #${invoiceValues.reference}`}</h2>
        <Formik             
          initialValues={initialValues}
          validationSchema={invoiceSchema}
          onSubmit={handleSubmit}
        >
          {({values, ...props}) => (
            <Form>    
                   
              <h4 className="color-primary">Bill From</h4>
              <MyAddressInput 
                street="streetFrom" 
                postCode="postCodeFrom" 
                city="cityFrom" 
                country="countryFrom"
              />
              <h4 className="color-primary">Bill To</h4>
              <MyInput 
                label="Client's Name"
                name="clientName"
                type="text"
              />
              <MyInput 
                label="Client's Email"
                name="email"
                type="email"
              />
              <MyAddressInput 
                street="streetTo" 
                postCode="postCodeTo" 
                city="cityTo" 
                country="countryTo"
              />
              <MyAddressInput 
                street="streetFrom" 
                postCode="postCodeFrom" 
                city="cityFrom" 
                country="countryFrom" 
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
              <MyItemInput itemList={values.itemList}/>
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
                      onClick={() => props.setFieldValue('status', 'draft')}
                    >
                      Save as Draft
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      onClick={() => props.setFieldValue('status', 'pending')}
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
