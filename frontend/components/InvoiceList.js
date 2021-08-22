import React , {useState, useRef} from 'react'
import Link from 'next/Link'
import moment from 'moment'

export default function InvoiceList({invoices, selected}) {
    const isEmpty= useRef(true);
    return (
        <div className="invoice-list">
            <div className="invoice-items">
                {invoices
                    .filter(invoice => {
                        if (selected.length > 0 ){
                            const tempSelected = selected.map((x) => x.value)        
                            if(tempSelected.includes(invoice.status)){
                                isEmpty.current = false
                                return true
                            }else{
                                isEmpty.current = true
                                return false
                            }
                        }else{
                            isEmpty.current = false
                            return true
                        }
                        
                    } )
                    .map((invoice, key) => (
                    
                    <Link href={`/invoice/${invoice.id}`} key={key}>
                        <a>
                            <div className="invoice-item">
                                <h4>{invoice.reference}</h4>
                            </div>
                            <div className="invoice-item">
                                <p>Due <time dateTime="2018-07-07">{moment(new Date(invoice.invoiceDate)).add(invoice.paymentTerms, 'days').format('DD MMM yyyy')}</time></p>
                            </div> 
                            <div className="invoice-item">
                                <p>{invoice.username}</p>
                            </div>
                            <div className="invoice-item">
                                <h4>€ 
                                    {
                                        invoice.items.reduce((acc, curr) => {
                                            return (acc) + (curr.quantity*curr.price)
                                        }, 0)
                                    } 
                                </h4>
                            </div>
                            <div className="invoice-item">
                                <div className="invoice-status paid">
                                    <span className="circle"></span> 
                                    {invoice.status}
                                </div>
                            </div>
                            <div className="invoice-item">
                                <img src="/assets/icon-arrow-right.svg" alt="" className="icon-arrow-right"/>
                            </div>
                        </a>
                    </Link>
                ))}
                {
                    isEmpty ? 
                        <div className="is-empty">
                            <img src="/assets/illustration-empty.svg" alt="" />
                            <h2>There is nothing here</h2>
                            <p>Create an invoice by clicking the New Invoice button and get started</p>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
