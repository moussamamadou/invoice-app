import PrivateLayout from "../components/PrivateLayout"
import ThemeProvider from "../components/ThemeProvider";
import {MyInput, MyAddressInput} from "../components/customField"
import {Formik, Form} from "formik"
import * as Yup from "yup"
import { withSession } from '../middlewares/session';
import { parseCookies } from "../utils/parseCookies";
import axios from 'axios'
import { useRouter } from 'next/router';
import Image from 'next/image'
import arrowImg from '../public/assets/icon-arrow-left.svg'

export default function User(props) {
  const router = useRouter();

  const {user, themeDarkInitial} = props;

  const initialValues = { 
    id: user.id,
    username: user.username,
    email: user.email, 
    // password: user.password, 
    address:{
      street: user.address?.street || '', 
      city: user.address?.city || '', 
      postCode: user.address?.postCode || '', 
      country: user.address?.country || ''
    }
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string().min(4, 'User Name should have at least 4 character').required('User name is required'),
    // email: Yup.string().email('Email is invalid').required('Email is required'),
    // password: Yup.string().min(8, 'Password should have at least 8 character')
  })

  const onSubmit = (values, {setSubmitting}) => {
    const body = {
      id : values.id,
      username: values.username,
      // email: values.email,
      // password: values.password,
      address: values.address
    };

    axios.post(`/api/users`, body).then((user) => {
      router.push('/user');
    }).catch(error => console.log("Error /api/users - ",error));

    setSubmitting(false);
  }

  return (
    <ThemeProvider themeDarkInitial={themeDarkInitial}>
      <PrivateLayout>     
        <div className="user">
          <div className="back-link">
              <a href="#" onClick={() => router.push("/")}>
                  <Image src={arrowImg} alt="" className="icon-arrow-left" />&nbsp;&nbsp;&nbsp;Go back   
              </a>                 
          </div>
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
                {/* <MyInput 
                  label="Email *"
                  name="email"
                  type="email"
                  placeholder="johndoe@email.com"
                /> */}
                {/* <MyInput 
                  label="Password *"
                  name="password"
                  type="password"
                  placeholder="Min. 8 character"
                />             */}
                <MyAddressInput />
                {/* <button type="submit" className="btn-primary">Update Profile</button> */}
                <button type="submit" className="btn-primary">Update</button>

              </Form>
            </Formik>
          </div>
        </div>   
      </PrivateLayout>
    </ThemeProvider>
  )
}

export const getServerSideProps = withSession((context) => {
  const { req, res } = context;
  const cookies = parseCookies(req);

  if(req.session.get('user') === undefined || req.session.get('user') === null){
    res.writeHead(302, {
      Location: '/login'
    });
    res.end();
  }
  return {
    props: {
      user: req.session.get('user') || null,
      themeDarkInitial: cookies.themeDark || false
    }
  }
})
