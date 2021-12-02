import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
 name: '',
 email: '',
 channel: '',
 validate: ''
};

const onSubmit = values => {
 console.log(values);
}

const validate = values => {
 let errors = {};

 if (!values.name) {
  errors.name = 'Required';
 }

 if (!values.email) {
  errors.email = 'Required';
 } else if (!/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
  errors.email = 'Invalid Format';
 }

 if (!values.channel) {
  errors.channel = 'Required';
 }

 return errors;
}

const validationSchema = Yup.object({
 name: Yup.string().required('Required'),
 email: Yup.string().email('Invalid Format').required('Required'),
 channel: Yup.string().required('Required')
})

function OldYoutubeForm() {
 const formik = useFormik({
  initialValues,
  onSubmit,
  validationSchema
  // validate
 });

 return (
  <div>
   <form className="form-section" onSubmit={formik.handleSubmit}>
    <div className="form-control">
    <label htmlFor="name">Name</label>
    <input type="text" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
    </div>

    <div className="form-control">
    <label htmlFor="email">E-mail</label>
    <input type="text" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
    </div>
    

    <div className="form-control">
    <label htmlFor="channel">Channel</label>
    <input type="text" id="channel" name="channel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel}/>
    {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div> : null}
    </div>
    

    <div className="btn">
    <button type="submit" className="submit-btn">Submit</button>
    </div>
   </form>
  </div>
 )
}

export default OldYoutubeForm
