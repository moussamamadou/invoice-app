import React from 'react'
import {Field, ErrorMessage, FieldArray, getIn} from "formik"

function MyInput({label, ...props}) {

    return (
        <div className="my-input">
            <label htmlFor={props.id || props.name}>{label}</label>
            <Field className="input" {...props}  />
            <ErrorMessage name={props.name} component="span" className='error'/>
        </div>
    )
}

function MySelect({label, ...props}) {

    return (
        <div className="my-select">
            <label htmlFor={props.id || props.name}>{label}</label>
            <Field className="select" {...props} as="select">
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
            </Field>
            <ErrorMessage name={props.name}  component="span" className='error'/>
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
            /> 
            <MyInput 
                label="Post Code"
                name={postCode}
                type="text"
            />           
            <MyInput 
                label="City"
                name={city}
                type="text"
            />           
            <MyInput 
                label="Country"
                name={country}
                type="text"
            />                         
        </div>
    )
}

function MyItemInput({items}) {
    return (
        <div className="my-item-input">
            <FieldArray name='items'>
                {(arrayHelpers) => (
                    <div>
                        {items && items.length > 0 ? (
                            items?.map((item, index, tab) =>(
                                <div className="item-list" key={index}>
                                    <div className="item-list-input">
                                        {index === 0 ? <label htmlFor={`items[${index}].name`}>Item Name</label> : null }
                                        <Field  name={`items[${index}].name`}>
                                            {({form, field, meta}) => (
                                                <input  type="text" {...field} className={meta.error && meta.touched ?'error': null}/>
                                            )}   
                                        </Field> 
                                    </div>                                   
                                    <div className="item-list-input">
                                        {index === 0 ? <label htmlFor={`items[${index}].quantity`}>Qty.</label> : null }
                                        <Field  name={`items[${index}].quantity`}  min="1" >
                                            {({form,field, meta}) => (
                                                <input type="number" {...field} className={meta.error && meta.touched ? 'error': null}/>
                                            )}   
                                        </Field>                                            
                                    </div>
                                    <div className="item-list-input">
                                        {index === 0 ? <label htmlFor={`items[${index}].price`}>Price</label> : null }
                                        <Field  name={`items[${index}].price`}  min="0">
                                            {({form,field, meta}) => (
                                                <input type="number" {...field} className={meta.error && meta.touched ? 'error': null}/>
                                            )}                             
                                        </Field>                                        
                                    </div>
                                    <div className="item-list-input">   
                                        <p className='Total'>{Math.round(items[index].price * items[index].quantity*100)/100}</p>                               
                                    </div>
                                    <div className="item-list-input">     
                                        <button type='button' onClick={() => arrayHelpers.form.values.items.length > 0 ? arrayHelpers.remove(index) : null}>
                                            <img src="/assets/icon-delete.svg" alt="Delete Item" />
                                        </button>                                             
                                    </div>
                                </div>
                            ))
                        ) : 'No Item'
                        }
                        {arrayHelpers.form.errors?.items && typeof arrayHelpers.form.errors?.items === 'string' 
                            ? <div className="error">{arrayHelpers.form.errors?.items}</div> 
                            : null
                        }
                        <button type='button' onClick={() => arrayHelpers.push({ name: '', quantity:1, price: 0.00})}>
                            <img src="/assets/icon-plus.svg" alt="Delete Item" /> Add item 
                        </button>   
                    </div>
                )}
            </FieldArray>                        
        </div>
    )
}

export  {MySelect, MyInput, MyAddressInput, MyItemInput}
