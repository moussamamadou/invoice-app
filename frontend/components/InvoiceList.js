import React , {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import arrowImg from '../public/assets/icon-arrow-right.svg'
import isEmptyImg from '../public/assets/illustration-empty.svg'

export default function InvoiceList({invoices, selected}) {

    const [filteredInvoices, setFilteredInvoices] = useState(invoices);

    useEffect(() => {
        setFilteredInvoices(invoices.filter(
            invoice => {
                if (selected.length > 0 ){
                    const tempSelected = selected.map((x) => x.value)        
                    if(tempSelected.includes(invoice.status)){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return true
                }                        
            } 
        ))
    }, [invoices, selected])
    
    return (
        <div className="invoice-list">
            <div className="invoice-items">
                {filteredInvoices
                    .map((invoice, key) => (
                        <Link href={`/invoice/${invoice.id}`} key={key}>
                            <a className="invoice-item">
                                <div className="invoice-item-detail item-detail-ref">
                                    <h4>#{invoice.reference}</h4>
                                </div>
                                <div className="invoice-item-detail item-detail-date">
                                    <p>Due <time dateTime="2018-07-07">{moment(new Date(invoice.invoiceDate)).add(invoice.paymentTerms, 'days').format('DD MMM yyyy')}</time></p>
                                </div> 
                                <div className="invoice-item-detail item-detail-name">
                                    <p>{invoice.clientName}</p>
                                </div>
                                <div className="invoice-item-detail item-detail-total">
                                    <h4>€ 
                                        {
                                            (invoice.items.reduce((acc, curr) => {
                                                return Math.round(((acc) + (curr.quantity*curr.price) + Number.EPSILON) * 100) / 100
                                            }, 0)).toFixed(2)
                                        } 
                                    </h4>
                                </div>
                                <div className="invoice-item-detail  item-detail-status">
                                    <div className={`invoice-status ${invoice.status}`}>
                                        <svg height="10" width="10">
                                            <circle cx="5" cy="5" r="3"/>
                                        </svg> 
                                        {invoice.status[0].toUpperCase() + invoice.status.substring(1)}
                                    </div>
                                </div>
                                <div className="invoice-item-detail item-detail-arrow">
                                    <Image src={arrowImg} alt="" className="icon-arrow-right" />                
                                </div>
                            </a>
                        </Link>
                    ))
                }
                {
                    filteredInvoices.length === 0 ? 
                        <div className="is-empty">
                            <div className="is-empty-container">
                                <Image src={isEmptyImg} alt="Nothing here" /> <h2>There is nothing here</h2>
                                <p>Create an invoice by clicking the New Invoice button and get started</p>
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
