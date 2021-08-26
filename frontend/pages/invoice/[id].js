import React, {useState, useContext} from "react";
import { useRouter } from 'next/router';
import Image from 'next/image'
import Modal from 'react-modal';
import PrivateLayout from "../../components/PrivateLayout";
import ThemeProvider from "../../components/ThemeProvider";
import InvoiceEditor from "../../components/InvoiceEditor";
import {MyModal} from "../../components/customField";
import { withSession } from '../../middlewares/session';
import { getInvoice, deleteInvoice, updateInvoice } from "../api/invoice";
import { parseCookies } from "../../utils/parseCookies";
import moment from 'moment'
import arrowImg from '../../public/assets/icon-arrow-left.svg'

Modal.setAppElement('#__next');

export default function InvoicePage({user, invoice, themeDarkInitial, ...props}) {
    const router = useRouter();
    const [deleteModalIsOpen, setDeleteIsOpen] = useState(false);
    const [editorModalIsOpen, setEditorModalIsOpen] = useState(false);

    const handleDelete = (id) =>{
        const response = deleteInvoice(user, id)
        .then(res => router.push(`/`))
    }

    const handleSend = (id) => {
        const data = { status : "pending" }
        updateInvoice(user,id, data)
            .then(res => router.reload(`/invoice/${id}`))
    }

    const handlePaid = (id) => {
        const data = { status : "paid" }
        updateInvoice(user,id, data)
            .then(res => router.reload(`/invoice/${id}`))
    }    
  return (
    <ThemeProvider themeDarkInitial={themeDarkInitial}>
        <MyModal
            deleteModalIsOpen={deleteModalIsOpen}
            setDeleteIsOpen={setDeleteIsOpen}
            handleDelete={handleDelete}
            id={invoice.id}
        />
        <PrivateLayout>
            <div className="invoice-detail">
                <div className="back-link">
                    <a onClick={() => router.push("/")}> 
                    <Image src={arrowImg} alt="" className="icon-arrow-left" />&nbsp;&nbsp;&nbsp;Go back    
                    </a>                 
                </div>
                <div className="invoice-header">
                    <div className="invoice-status-wrapper">
                        <div className="invoice-label">
                            <p>Status</p>
                        </div> 
                        <div className={`invoice-status ${invoice.status}`}>
                            <svg height="10" width="10">
                                <circle cx="5" cy="5" r="3"/>
                            </svg> 
                            {invoice.status[0].toUpperCase() + invoice.status.substring(1)}
                        </div>
                    </div>  
                    <div className="invoice-action">
                        <button 
                            className="btn-default" 
                            onClick={() => setEditorModalIsOpen(true)}                        
                        >
                            Edit
                        </button>
                        <button 
                            className="btn-delete" 
                            onClick={() => setDeleteIsOpen(true)} 
                        >
                            Delete
                        </button>
                        {invoice.status === 'draft' ? 
                            <button className="btn-secondary" onClick={() => handleSend(invoice.id) }>Send Invoice</button> : null }
                        {invoice.status === 'pending' ? 
                            <button className="btn-primary" onClick={() => handlePaid(invoice.id) }>Mark as Paid</button> : null }
                        
                    </div>
                </div>
                <div className="invoice-content">
                    <div className="invoice-provider">
                        <div className="invoice-ref"><h3>#{invoice.reference}</h3><p>{invoice.projectDescription}</p></div>
                        <div className="invoice-billFrom">
                            <p>{invoice.addressFrom.street}</p>
                            <p>{invoice.addressFrom.city}</p>
                            <p>{invoice.addressFrom.postCode}</p>
                            <p>{invoice.addressFrom.country}</p>
                        </div>
                    </div>
                    <div className="invoice-client">
                        <div className="invoice-date">
                            <div>
                                <p>Invoice Date</p>
                                <h3><time dateTime="2018-07-07">{moment(new Date(invoice.invoiceDate)).format('DD MMM yyyy')}</time></h3>
                            </div>
                            <div>
                                <p>Payment Date</p>
                                <h3><time dateTime="2018-07-07">{moment(new Date(invoice.invoiceDate)).add(invoice.paymentTerms, 'days').format('DD MMM yyyy')}</time></h3>
                            </div>
                        </div>
                        <div className="invoice-billto">
                            <p>Bill to</p>                            
                            <h3>{invoice.clientName}</h3>
                            <p>{invoice.addressTo.street}</p>
                            <p>{invoice.addressTo.city}</p>
                            <p>{invoice.addressTo.postCode}</p>
                            <p>{invoice.addressTo.country}</p>
                        </div>
                        <div className="invoice-sendto">
                            <p>Send to</p>
                            <h3>{invoice.clientEmail}</h3>
                        </div>
                    </div>
                    <div className="invoice-item">
                        <div className="invoice-item-content">
                            <div className="invoice-item-head">
                                <div className="first-item"><p>Item Name</p></div>
                                <div><p>QTY.</p></div>
                                <div><p>Price</p></div>
                                <div><p>Total</p></div>
                            </div>
                            { 
                                invoice.items?.map((item, key) => (
                                    <div className="invoice-item-body" key={key}>    
                                        <div className="first-item"><h4>{item.name} </h4><p>{item.quantity} x € {(Math.round((item.price + Number.EPSILON) * 100) / 100).toFixed(2)}</p></div>
                                        <div className="second-item"><p>{item.quantity}</p></div>
                                        <div className="third-item"><p>€ {(Math.round((item.price + Number.EPSILON) * 100) / 100).toFixed(2)}</p></div>
                                        <div className="fourth-item"><h4>€ {(Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100).toFixed(2)}</h4></div>
                                    </div>   
                                ))
                            }
                        </div>
                        <div className="invoice-item-footer">
                            <div>Amount Due</div>
                            <div>
                                <h2>€ &nbsp;                                    
                                    {
                                        (invoice.items.reduce((acc, curr) => {
                                            return Math.round(((acc) + (curr.quantity*curr.price) + Number.EPSILON) * 100) / 100 
                                        }, 0)).toFixed(2)
                                    } 
                                </h2>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
            <InvoiceEditor 
                isNew={false} 
                invoice={invoice} 
                user={user}              
                editorModalIsOpen={editorModalIsOpen}
                setEditorModalIsOpen={setEditorModalIsOpen}
            />        
        </PrivateLayout>
    </ThemeProvider>
  )
}

export const  getServerSideProps = withSession(async(context) => {
    const { req, res, params  } = context;
    const cookies = parseCookies(req);
  
    if(req.session.get('user') === undefined || req.session.get('user') === null){
      res.writeHead(302, {
        Location: '/login'
      });
      res.end();
    }
  
    const user = req.session.get('user');
    var  invoice;
    const response = await getInvoice(user, params.id).then(data => invoice = data)
    
    if(!invoice || invoice === undefined){
        res.writeHead(302, {
            Location: '/'
          });
          res.end();
    }

    return {
      props: {
        user: user || null,
        invoice: invoice || null,
        themeDarkInitial: cookies.themeDark || false
      }
    }
  })