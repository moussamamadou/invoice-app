import { Form, Formik } from 'formik';
import React, { useState, useContext, useEffect } from 'react'
import {MyInput, MySelect, MyAddressInput, MyItemInput} from "./customField"
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { updateInvoice, addInvoice } from "../pages/api/invoice"
import Modal from 'react-modal';
import {ThemeContext} from "./ThemeProvider";
import { Scrollbars } from 'rc-scrollbars';

Modal.setAppElement('#__next');

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

export default function InvoiceEditor({isNew, invoice, user, editorModalIsOpen, setEditorModalIsOpen, handleEditor }) {
  const router = useRouter();
  
  const [typeEditor, setTypeEditor] = useState('add');

  useEffect(() => {
    if(isNew){
      setTypeEditor('add');
    }else {
      setTypeEditor('update');
    }
  }, [isNew]);

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
    if(isNew){
      typeEditor
    }
    if (typeEditor === 'add'){
      const response = addInvoice(user, values)
        .then(res => {
          router.push(`/invoice/${res.id}`);
          setSubmitting(false);
          resetForm();    
        })
        .catch(error => {
          console.log(error);
          setSubmitting(false);
          resetForm();    
        })   
    } else if (typeEditor === 'update'){
      const response = updateInvoice(user, values.id, values)
        .then(res => {
          router.reload(`/invoice/${values.id}`);
          setSubmitting(false);
          resetForm();    
        })
        .catch(error => console.log(error))   
    }
  }

  const theme = useContext(ThemeContext);

  function openDeleteModal() {
      setEditorModalIsOpen(true);
  }
  function closeCancelModal() {
      setEditorModalIsOpen(false);
  }

  useEffect(() => {   
    const body = document.body;
    if(editorModalIsOpen){
      body.style.overflow ="hidden"
    } else{
      body.style.overflow =""
    }
  }, [editorModalIsOpen])

  return (
    <Modal
        isOpen={editorModalIsOpen}
        onRequestClose={closeCancelModal}
        className="modal-editor"
       overlayClassName="overlay-editor"
    >
        <div className={`modal-theme invoice-editor ${theme.themeDark ? "theme-dark" : "theme-light"}`}>
            <h2>{isNew ? `New Invoice` : `Edit #${invoice.reference}`}</h2>
            <Formik             
              initialValues={invoiceValue}
              validationSchema={invoiceSchema}
              onSubmit={handleSubmit}
            >
              {({values, ...props}) => (
                  <Form>    
                    <Scrollbars style={{ width: '100%',height:'100%'}}>
                      <div className="inside-scrollbar">
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
                        <div className="my-date-input">
                          <MyInput
                            label="Issue Date"
                            name="invoiceDate"
                            type="date"
                          />
                          <MySelect 
                            label='Payments Terms'
                            name='paymentTerms'
                          />
                        </div>
                        <MyInput
                          label="Project Description"
                          name="projectDescription"
                          type="text"
                        />
                        <h3>Item List</h3> 
                        <MyItemInput items={values.items}/>
                      </div>
                    </Scrollbars>
                    {
                      isNew ? 
                        <div className="btn-primary-wrapper">
                          <button 
                            type="button"
                            className="btn-default" 
                            onClick={() => {setEditorModalIsOpen(false);}}
                          >
                            Discard</button>
                          <button 
                            type="submit" 
                            className="btn-secondary" 
                            onClick={() => {
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
                            type="button" 
                            className="btn-default" 
                            onClick={() => {setEditorModalIsOpen(false);}}
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
    </Modal>
  )
}
