import PublicLayout from "../components/PublicLayout"
import {MySelect, MyInput, MyAddressInput} from "../components/customField"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import Link from "next/Link"
import { withSession } from '../middlewares/session';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  const initialValues = { 
    username:'',
    email: '', 
    password: '', 
    address: {
     street: '', 
     city: '', 
     postCode: '', 
     country: '',
    },
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string().min(4, 'User Name should have at least 4 character').required('User name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(8, 'Password should have at least 8 character').required('Password is required')
  })

  const onSubmit = (values, {setSubmitting}) => {
    console.log("Login submit!", values)
    
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
      address: values.address
    };

    axios.post('/api/register', body).then((user) => {
      router.push('/');
    }).catch(error => console.log(error));

    setSubmitting(false);
  }
  
  return (
    <PublicLayout>
      <div className="register-container">
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