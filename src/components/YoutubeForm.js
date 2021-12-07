import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
 name: '',
 email: '',
 channel: '',
 comments: '',
 address: '',
 social: {
  facebook: '',
  twitter: ''
 },
 phoneNumber: ['', ''],
 phNumbers: [''],
};

const onSubmit = values => {
 console.log(values);
}

const validationSchema = Yup.object({
 name: Yup.string().required('Required'),
 email: Yup.string().email('Invalid Format').required('Required'),
 channel: Yup.string().required('Required'),
})

const validateComments = value => {
  let error;
  if(!value) {
    error = 'Required';
  }
  return error;
}

function YoutubeForm() {
  return (
  <Formik
   initialValues={initialValues}
   validationSchema={validationSchema}
   onSubmit={onSubmit}
  //  validateOnChange={false}
  //  validateOnBlur={false}
   >
   <Form className="form-section">
    <div className="form-control">
    <label htmlFor="name">Name</label>
    <Field type="text" id="name" name="name"/>
    <ErrorMessage name="name" component={TextError} />
    </div>

    <div className="form-control">
    <label htmlFor="email">E-mail</label>
    <Field type="text" id="email" name="email"/>
    <ErrorMessage name="email">
     {
      (props) => <div className="error">{props}</div>
     }
    </ErrorMessage>
    </div>
    

    <div className="form-control">
    <label htmlFor="channel">Channel</label>
    <Field type="text" id="channel" name="channel"/>
    <ErrorMessage name="channel" component={TextError}/>
    </div>
    
    <div className="form-control">
     <label htmlFor="comments">Comments</label>
     <Field as="textarea" id="comments" name="comments" validate={validateComments} />
     <ErrorMessage name="comments" component={TextError} />
    </div>

    <div className="form-control">
     <label htmlFor="address">Address</label>
     <FastField name="address">
      {
       (props) => {
        console.log('Field render')
        const {field, form, meta} = props;
        return (
         <div>
           <input type="text" id='address' {...field} />
           {meta.touched && meta.error ? <div>{meta.error}</div> : null}
         </div>
        )
       }
      }
     </FastField>
    </div>

    <div className="form-control">
     <label htmlFor="facebook">Facebook</label>
     <Field type="text" id="facebook" name="social.facebook" />
    </div>

    <div className="form-control">
     <label htmlFor="twitter">Twitter</label>
     <Field type="text" id="twitter" name="social.twitter" />
    </div>

    <div className="form-control">
     <label htmlFor="primaryPh">Primary Phone Number</label>
     <Field type="text" id="primaryPh" name="phoneNumber[0]" />
    </div>

    <div className="form-control">
     <label htmlFor="secondaryPh">secondary Phone Number</label>
     <Field type="text" id="secondaryPh" name="phoneNumber[1]" />
    </div>

    <div className="form-control">
      <label htmlFor="">List of Phone Numbers</label>
      <FieldArray name="phNumbers">
          {
            (fieldArrayProps) => {
              const { push, remove,form } = fieldArrayProps;
              const { values } = form;
              const { phNumbers } = values;
              return (
                <div>
                  {
                    phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`} />
                        {
                          (index > 0) && 
                          <button type="button" onClick={() => remove(index)}>-</button>
                        }
                        <button type="button" onClick={() => push('')}>+</button>
                      </div>
                    ))
                  }
                </div>
              )
            }
          }
      </FieldArray>
    </div>

    <div className="btn">
    <button type="submit" className="submit-btn">Submit</button>
    </div>
   </Form>
  </Formik>
 )
}

export default YoutubeForm
