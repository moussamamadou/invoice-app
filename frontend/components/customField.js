import React, {useContext} from 'react'
import Modal from 'react-modal';
import {Field, ErrorMessage, FieldArray} from "formik"
import {ThemeContext} from "./ThemeProvider";

function MyInput({label, myClass ='', ...props}) {

    return (
        <div className={`my-input ${myClass}`}>
            <div className="label-wrapper">
                <label htmlFor={props.id || props.name}>{label}</label>
                <ErrorMessage name={props.name} component="span" className='error'/>
            </div>
            <ErrorMessage name={props.name}>{()=>(<span className="error">&nbsp;</span>)}</ErrorMessage>

            <Field className="input" {...props}  />
        </div>
    )
}

function MySelect({label, ...props}) {

    return (
        <div className="my-select">
        <div className="label-wrapper">
            <label htmlFor={props.id || props.name}>{label}</label>
            <ErrorMessage name={props.name}  component="span" className='error'/>
        </div>
            <Field className="select" {...props} as="select">
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
            </Field>
        </div>
    )
}



function MyAddressInput({street ='address.street', postCode ='address.postCode', city='address.city', country='address.country'}) {
    return (
        <div className="my-address-input">
            <MyInput 
                label="Street Address"
                name={street}
                type="text"
                myClass="street"
            /> 
            <MyInput 
                label="Post Code"
                name={postCode}
                type="text"
                myClass="post-code"
            />           
            <MyInput 
                label="City"
                name={city}
                type="text"
                myClass="city"
            />           
            <MyInput 
                label="Country"
                name={country}
                type="text"
                myClass="country"
            />                         
        </div>
    )
}

function MyItemInput({items}) {
    return (
            <FieldArray name='items'>
                {(arrayHelpers) => (
                    <>
                        {items && items.length > 0 ? (
                            items?.map((item, index, tab) =>(
                                <div className="my-item-input" key={index}>
                                    <div className="item-list-input name-input">
                                        <label htmlFor={`items[${index}].name`} className={`item-input-${index}`}>Item Name</label>
                                        <Field  name={`items[${index}].name`}>
                                            {({form, field, meta}) => (
                                                <input  type="text" {...field} className={meta.error && meta.touched ?'error': null}/>
                                            )}   
                                        </Field> 
                                    </div>                                   
                                    <div className="item-list-input quantity-imput">
                                        <label htmlFor={`items[${index}].quantity`} className={`item-input-${index}`}>Qty.</label> 
                                        <Field  name={`items[${index}].quantity`}  min="1" >
                                            {({form,field, meta}) => (
                                                <input type="number" {...field} className={meta.error && meta.touched ? 'error': null}/>
                                            )}   
                                        </Field>                                            
                                    </div>
                                    <div className="item-list-input price-input">
                                        <label htmlFor={`items[${index}].price`} className={`item-input-${index}`}>Price</label>
                                        <Field  name={`items[${index}].price`}  min="0">
                                            {({form,field, meta}) => (
                                                <input type="number" {...field} className={meta.error && meta.touched ? 'error': null}/>
                                            )}                             
                                        </Field>                                        
                                    </div>
                                    <div className="item-list-input total-input">   
                                        <label htmlFor={`items[${index}].price`} className={`item-input-${index}`}>Total</label>
                                        <h4 className='Total'>{Math.round(items[index].price * items[index].quantity*100)/100}</h4>                               
                                    </div>
                                    <div className="item-list-input delete-input">  
                                        <label htmlFor={`items[${index}].price`} className={`item-input-${index}`}>&nbsp;</label>
                                        <button type='button' className="btn-icon" onClick={() => arrayHelpers.form.values.items.length > 0 ? arrayHelpers.remove(index) : null}>
                                        <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fillRule="nonzero"/></svg>
                                        </button>                                             
                                    </div>
                                </div>
                            ))
                        ) : <h4>No Item</h4> 
                        }
                        {arrayHelpers.form.errors?.items && typeof arrayHelpers.form.errors?.items === 'string' 
                            ? <div className="error">{arrayHelpers.form.errors?.items}</div> 
                            : null
                        }
                        <button type='button' className="btn-default add-input" onClick={() => arrayHelpers.push({ name: '', quantity:1, price: 0.00})}>
                            <img src="/assets/icon-plus.svg" alt="Delete Item" /> Add item 
                        </button>   
                    </>
                )}
            </FieldArray>
    )
}

const MyModal = ({deleteModalIsOpen, setDeleteIsOpen, handleDelete, id}) => {
    const theme = useContext(ThemeContext);
    console.log(theme)

    function openDeleteModal() {
        setDeleteIsOpen(true);
      }
    function closeDeleteModal() {
        handleDelete(id);
        setDeleteIsOpen(false);
    }
    function closeCancelModal() {
        setDeleteIsOpen(false);
    }

    return (   
        <Modal
            isOpen={deleteModalIsOpen}
            onRequestClose={closeCancelModal}
            className="modal"
           overlayClassName="overlay"
        >
            <div 
            className={`modal-theme ${theme.themeDark ? "theme-dark" : "theme-light"}`}
            >                
                <h1>Confirm Deletion</h1>
                <p>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
                <div className="modal-btn">
                    <button className="btn-delete" onClick={closeDeleteModal}>Delete</button>
                    <button className="btn-secondary" onClick={closeCancelModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export  {MySelect, MyInput, MyAddressInput, MyItemInput, MyModal}
