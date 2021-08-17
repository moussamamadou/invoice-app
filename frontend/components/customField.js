import React from 'react'
import {Field, ErrorMessage, useField} from "formik"
import DatePicker from "react-datepicker"

function MyInput({label, ...props}) {

    const [field, meta] = useField(props);

    return (
        <div className="my-input">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="input" {...field} {...props} />
            {meta.touched && meta.error ? 
                <div className="error">{meta.error}</div> 
                : null
            }
        </div>
    )
}

function MySelect({label, ...props}) {

    const [field, meta] = useField(props);

    return (
        <div className="my-select">
            <label htmlFor={props.id || props.name}>{label}</label>
            <select className="select" {...field} {...props} />
            {meta.touched && meta.error 
                ? <div className="error">{meta.error}</div> 
                : null
            }
        </div>
    )
}


function MyDatePicker({label, ...props}) {

    const [field, meta] = useField(props);

    return (
        <div className="my-date-picker">
            <label htmlFor={props.id || props.name}>{label}</label>
            <DatePicker className="date-picker" {...field} {...props} />
            {meta.touched && meta.error 
                ? <div className="error">{meta.error}</div> 
                : null
            }
        </div>
    )
}

function MyAddressInput({street, postCode, city, country}) {
    return (
        <div className="my-address-input">
            <MyInput 
                label="Street Address"
                name={streetAddress}
                type="text"
                placeholder=""
            /> 
            <MyInput 
                label="Post Code"
                name={postCode}
                type="text"
                placeholder=""
            />           
            <MyInput 
                label="City"
                name={city}
                type="text"
                placeholder=""
            />           
            <MyInput 
                label="Country"
                name={country}
                type="text"
                placeholder=""
            />                         
        </div>
    )
}

function MyItemInput({street, postCode, city, country}) {
    return (
        <div className="my-item-input">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="input" {...field} {...props} />
            {meta.touched && meta.error ? 
                <div className="error">{meta.error}</div> 
                : null
            }
            <MyInput 
                label="Item Name"
                name="itemName"
                type="text"
            />
            <MyInput 
                label="Qty"
                name="quantity"
                type="number"
            />           
            <MyInput 
                label="Price"
                name="price"
                type="number"
            />           
            <p>156.00</p> 
            <button><img src="/assets/icon-delete.svg" alt="Delete Item" /></button>                        
        </div>
    )
}

export  {MySelect, MyInput, MyDatePicker, MyAddressInput, MyItemInput}
