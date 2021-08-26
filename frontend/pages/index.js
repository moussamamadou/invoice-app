import React, {useState} from "react";
import PrivateLayout from "../components/PrivateLayout";
import ThemeProvider from "../components/ThemeProvider";
import InvoiceList from "../components/InvoiceList";
import InvoiceEditor from "../components/InvoiceEditor";
import MultiSelect from "react-multi-select-component";
import { withSession } from '../middlewares/session';
import { parseCookies } from "../utils/parseCookies";
import { getInvoices } from "./api/invoice"
import Image from 'next/image'
import plusImg from '../public/assets/icon-plus.svg'


export default function Home(props) {
  const {invoices, user, themeDarkInitial} = props;
  const [editorModalIsOpen, setEditorModalIsOpen] = useState(false);
  
  const options = [
    {label:'Draft', value:'draft'},
    {label:'Pending', value:'pending'},
    {label:'Paid', value:'paid'}
  ];
  const [selected, setSelected] = useState([]);
  const overrideStrings = {
    "selectSomeItems": "Filter by status"
  }
  
  return (
    <ThemeProvider themeDarkInitial={themeDarkInitial}>
      <PrivateLayout>
        <div className="home-header">
          <div className="home-header-title">
            <h1>Invoices</h1>
            <p>{invoices.length === 0 ? `No invoices`: `You have ${invoices.length} invoice${invoices.length >1 ? 's' : ''} in total.` }</p>
          </div>
          <div className="home-header-action">
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              disableSearch={true}
              hasSelectAll={false}
              // shouldToggleOnHover={true}
              overrideStrings={overrideStrings}
            />          
            <button 
              className="btn-primary" 
              onClick={() => setEditorModalIsOpen(true)} 
            >
              <Image src={plusImg} alt="" width={10} height={10} /> &nbsp;&nbsp; New Invoice
            </button>
          </div>
        </div>
        <div className="home-content">
          <InvoiceList invoices={invoices} selected={selected}/>
        </div>
        <InvoiceEditor 
          isNew={true} 
          user={user}  
          editorModalIsOpen={editorModalIsOpen}
          setEditorModalIsOpen={setEditorModalIsOpen}
        />
      </PrivateLayout>
    </ThemeProvider>
  )
}

export const  getServerSideProps = withSession(async(context) => {
  const { req, res } = context;
  const cookies = parseCookies(req);

  if(req.session.get('user') === undefined || req.session.get('user') === null){
    res.writeHead(302, {
      Location: '/login'
    });
    res.end();
  }

  const user = req.session.get('user');
  var  invoices = [];
  const response = await getInvoices(user).then(data => invoices = data)

  return {
    props: {
      user: user || null,
      invoices: invoices || null,
      themeDarkInitial: cookies.themeDark || false
    }
  }
})