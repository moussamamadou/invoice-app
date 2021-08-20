import PrivateLayout from "../components/PrivateLayout"
import {MySelect, MyInput, MyAddressInput} from "../components/customField"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import { withSession } from '../middlewares/session';



export default function User(props) {

  const {user} = props;

  console.log(user)
  const initialValues = { 
    username:'',
    email: '', 
    password: '', 
    // street: '', 
    // city: '', 
    // postcode: '', 
    // country: ''
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
    <PrivateLayout>
      <h1> User Page</h1>    
      
      <img src="/assets/image-avatar.jpg" alt="logo" className="Profile Picture" />
      <div className="user-container">
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
            {/* <MyAddressInput /> */}
            {/* <button type="submit" className="btn-primary">Update Profile</button> */}
          </Form>
        </Formik>
      </div>
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
