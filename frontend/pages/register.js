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
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password should have at least 8 character').required('Required')
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
            <MyAddressInput street="street" postCode="postCode" city="city" country="country"/>
            <button type="submit" className="btn">Register</button>
            <p> All ready registered ? <Link href="/login"><a>Log here</a></Link></p>
          </Form>
        </Formik>
      </div>
    </PublicLayout>
  )
}
