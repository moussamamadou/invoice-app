import React, {useState} from "react"
import PrivateLayout from "../../components/PrivateLayout"
import InvoiceEditor from "../../components/InvoiceEditor"

export default function Home() {

  return (
    <PrivateLayout>
      <h1>Invoice page</h1>
        <div className="invoice-detail">
            <div className="link">
                <img src="/assets/icon-arrow-left.svg" alt="" className="icon-arrow-left"/> Go back     
            </div>
            <div className="invoice-header">
                <div className="invoice-status-wrapper">
                    <div className="invoice-label">
                        <p>Status</p>
                    </div> 
                    <div className="invoice-status paid">
                        <span className="circle"></span> 
                        Paid
                    </div>
                </div>  
                <div className="invoice-action">
                    <button className="btn-edit" >
                        Edit
                    </button>
                    <button className="btn-delete" >
                        Delete
                    </button>
                    <button className="btn" >
                        Mark as Paid
                    </button>
                </div>
            </div>
            <div className="invoice-content">
                <div className="invoice-provider">
                    <div className="invoice-ref"><h3>#XM9141</h3><p>Graphic Design</p></div>
                    <div className="invoice-billfrom">
                        <p>19 Union Terrace</p>
                        <p>London</p>
                        <p>E1 3EZ</p>
                        <p>United Kingdom</p>
                    </div>
                </div>
                <div className="invoice-client">
                    <div className="invoice-due">
                        <div className="invoice-date">
                            <div className="">
                                <p>Invoice Date</p>
                                <h3><time dateTime="2018-07-07">21 Aug 2021</time></h3>
                            </div>
                            <div className="">
                                <p>Invoice Date</p>
                                <h3><time dateTime="2018-07-07">21 Aug 2021</time></h3>
                            </div>
                        </div>
                        <div className="invoice-billto">
                            <p>Bill to</p>
                            <h3>Alex Grim</h3>
                            <p>84 Church Way</p>
                            <p>London</p>
                            <p>E1 3EZ</p>
                            <p>United Kingdom</p>
                        </div>
                    </div>
                    <div className="invoice-sendto">
                        <p>Send to</p>
                        <h3>alexgrim@mail.com</h3>
                    </div>
                </div>
                <div className="invoice-item">
                    <div className="item-content">
                        <div className="item-head">
                            <div>Item Name</div>
                            <div>QTY.</div>
                            <div>Price</div>
                            <div>Total</div>
                        </div>
                        <div className="item-body">    
                            <div><h4>Banner Design</h4><p>1 x € 156.00</p></div>
                            <div>1</div>
                            <div>€ 156.00</div>
                            <div><h4>€ 156.00</h4></div>
                        </div> 
                        <div className="item-body">  
                            <div><h4>Banner Design</h4><p>1 x € 156.00</p></div>
                            <div>1</div>
                            <div>€ 156.00</div>
                            <div><h4>€ 156.00</h4></div>  
                        </div> 
                    </div>
                    <div className="item-footer">
                        <div>Amount Due</div>
                        <div><h2>€ 556.00</h2> </div>
                    </div>                     
                </div>
            </div>
        </div>
        <InvoiceEditor />
        
    </PrivateLayout>
  )
}
