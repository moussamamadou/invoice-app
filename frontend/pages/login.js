import React from "react"
import PublicLayout from "../components/PublicLayout"
import {MySelect, MyInput} from "../components/customField"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import Link from "next/link"

export default function Login() {
  const initialValues = { email: '', password: ''};

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password should have at least 8 character').required('Required')
  })

  const onSubmit = (values, {setSubmitting}) => {
    console.log("Login submit!")
    setSubmitting(false);
  }
  
  return (
    <PublicLayout>
      <div className="login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <MyInput 
              label="Email"
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
            <MyInput 
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 8 character"
            />
            <button type="submit" className="btn">Login</button>
            <p> Not registered yet ? <Link href="/register"><a>Create an account</a></Link></p>
          </Form>
        </Formik>
        <button type="Submit" class="btn-save">Demo Login</button>
      </div>
    </PublicLayout>
  )
}
