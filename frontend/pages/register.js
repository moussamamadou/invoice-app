import PublicLayout from "../components/PublicLayout"
import {MySelect, MyInput, MyAddressInput} from "../components/customField"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import Link from "next/link"

export default function Register() {
  const initialValues = { 
    email: '', 
    password: '', 
    street: '', 
    city: '', 
    postcode: '', 
    country: ''
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string().min(4, 'User Name should have at least 4 character').required('User name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(8, 'Password should have at least 8 character').required('Password is required')
  })

  const onSubmit = (values, {setSubmitting}) => {
    console.log("Register submit!")
    setSubmitting(false);
  }
  
  return (
    <PublicLayout>
      <div className="login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <MyInput 
              label="Name *"
              name="username"
              type="text"
              placeholder="John Doe"
            />
            <MyInput 
              label="Email *"
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
            <MyInput 
              label="Password *"
              name="password"
              type="password"
              placeholder="Min. 8 character"
            />            
            <MyAddressInput />
            <button type="submit" className="btn-primary">Register</button>
            <p> All ready registered ? <Link href="/login"><a>Log here</a></Link></p>
          </Form>
        </Formik>
      </div>
    </PublicLayout>
  )
}
