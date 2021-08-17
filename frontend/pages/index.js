import React, {useState} from "react"
import PrivateLayout from "../components/PrivateLayout"
import InvoiceList from "../components/InvoiceList"
import MultiSelect from "react-multi-select-component"

export default function Home() {
  const options = [
    {label:'Draft', value:'draft'},
    {label:'Pending', value:'pending'},
    {label:'Paid', value:'paid'}
  ];
  const [selected, setSelected] = useState([]);

  return (
    <PrivateLayout>
      <div className="home-headear">
        <div className="home-header-title">
          <h1>Invoices</h1>
          <p>No invoices</p>
        </div>
        <div className="home-header-action">
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            disableSearch={true}
            hasSelectAll={false}
            labelledBy="Filter by status"
          />          
          <button className="btn" >
            <img src="/assets/icon-plus.svg" alt="" /> New Invoice
          </button>
        </div>
        <div className="home-content">
        </div>
      </div>
      <div className="home-content">
        <InvoiceList />
      </div>
    </PrivateLayout>
  )
}
