import React, {useState} from "react";
import PrivateLayout from "../../components/PrivateLayout";
import InvoiceEditor from "../../components/InvoiceEditor";
import { withSession } from '../../middlewares/session';
import { getInvoice, deleteInvoice, updateInvoice } from "../api/invoice";
import moment from 'moment'
import { useRouter } from 'next/router';

export default function InvoicePage({user, invoice, ...props}) {
    const router = useRouter();

    console.log(invoice)
    const handleDelete = (id) => {
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
    <PrivateLayout>
      <h1>Invoice page</h1>
        <div className="invoice-detail">
            <div className="link">
                <a href="#" onClick={() => router.push("/")}>
                    <img src="/assets/icon-arrow-left.svg" alt="" className="icon-arrow-left" /> Go back    
                </a>                 
            </div>
            <div className="invoice-header">
                <div className="invoice-status-wrapper">
                    <div className="invoice-label">
                        <p>Status</p>
                    </div> 
                    <div className="invoice-status paid">
                        <span className="circle"></span> 
                        {invoice.status}
                    </div>
                </div>  
                <div className="invoice-action">
                    <button className="btn-default" >
                        Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(invoice.id) } >
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
                    <div className="invoice-ref"><h3>{invoice.reference}</h3><p>{invoice.projectDescription}</p></div>
                    <div className="invoice-billFrom">
                        <p>{invoice.addressFrom.street}</p>
                        <p>{invoice.addressFrom.city}</p>
                        <p>{invoice.addressFrom.postCode}</p>
                        <p>{invoice.addressFrom.country}</p>
                    </div>
                </div>
                <div className="invoice-client">
                    <div className="invoice-due">
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
                    </div>
                    <div className="invoice-sendto">
                        <p>Send to</p>
                        <h3>{invoice.clientEmail}</h3>
                    </div>
                </div>
                <div className="invoice-item">
                    <div className="item-content">
                        <div className="item-head">
                            <div><p>Item Name</p></div>
                            <div><p>QTY.</p></div>
                            <div><p>Price</p></div>
                            <div><p>Total</p></div>
                        </div>
                        { 
                            invoice.items?.map((item, key) => (
                                <div className="item-body" key={key}>    
                                    <div><h4>{item.name} </h4><p>{item.quantity} x € {item.price}</p></div>
                                    <div><p>{item.quantity}</p></div>
                                    <div><p>€ {item.price}</p></div>
                                    <div><h4>€ {item.price * item.quantity}</h4></div>
                                </div>   
                            ))
                        }
                    </div>
                    <div className="item-footer">
                        <div>Amount Due</div>
                        <div>
                            <h2>€                                     
                                {
                                    invoice.items.reduce((acc, curr) => {
                                        return (acc) + (curr.quantity*curr.price)
                                    }, 0)
                                } 
                            </h2>
                        </div>
                    </div>                     
                </div>
            </div>
        </div>
        <InvoiceEditor isNew={false} invoice={invoice} user={user}/>
        
    </PrivateLayout>
  )
}

export const  getServerSideProps = withSession(async(context) => {
    const { req, res, params  } = context;
  
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
        invoice: invoice
      }
    }
  })