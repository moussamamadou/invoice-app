import React from "react"
import PublicLayout from "../components/PublicLayout"
import {MySelect, MyInput} from "../components/customField"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import Link from "next/Link"
import axios from 'axios';
import { useRouter } from 'next/router';
import { withSession } from '../middlewares/session';

export default function Login() {
  const router = useRouter();

  const initialValues = { email: '', password: ''};
  
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(8, 'Password should have at least 8 character').required('Password is required')
  })

  const onSubmit = (values, {setSubmitting}) => {
    
    const body = {
      email: values.email,
      password: values.password,
    };

    axios.post('/api/login', body).then((user) => {
      router.push('/');
    }).catch(error => console.log(error));

    setSubmitting(false);
  }

  const demoLogin = () => {   
    axios.post('/api/demo-login').then((user) => {
      router.push('/');
    }).catch(error => console.log(error));
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
            <button type="submit" className="btn-primary">Login</button>
            <p> Not registered yet ? <Link href="/register"><a>Create an account</a></Link></p>
          </Form>
        </Formik>
        <button type="button" className="btn-secondary" onClick={demoLogin}>Demo Login</button>
      </div>
    </PublicLayout>
  )
}

export const getServerSideProps = withSession((context) => {
  const { req, res } = context;
  if(req.session.get('user') ){
    res.writeHead(302, {
      Location: '/user'
    });
    res.end();
  }
  return {props: {}}
})