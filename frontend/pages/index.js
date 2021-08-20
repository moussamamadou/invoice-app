import React, {useState} from "react"
import PrivateLayout from "../components/PrivateLayout"
import InvoiceList from "../components/InvoiceList"
import InvoiceEditor from "../components/InvoiceEditor"
import MultiSelect from "react-multi-select-component"
import { withSession } from '../middlewares/session';

export default function Home(props) {
  const options = [
    {label:'Draft', value:'draft'},
    {label:'Pending', value:'pending'},
    {label:'Paid', value:'paid'}
  ];
  const [selected, setSelected] = useState([]);

  return (
    <PrivateLayout>
      <h1>Home page</h1>
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
          <button className="btn-primary" >
            <img src="/assets/icon-plus.svg" alt="" /> New Invoice
          </button>
        </div>
        <div className="home-content">
        </div>
      </div>
      <div className="home-content">
        <InvoiceList />
      </div>
      <h1>Invoice Editor</h1>
      <InvoiceEditor isNew={true} />

    </PrivateLayout>
  )
}

export const getServerSideProps = withSession((context) => {
  const { req, res } = context;
  if(req.session.get('user') === undefined || req.session.get('user') === null){
    res.writeHead(302, {
      Location: '/login'
    });
    res.end();
  }
  return {
    props: {
      user: req.session.get('user') || null,
    }
  }
})