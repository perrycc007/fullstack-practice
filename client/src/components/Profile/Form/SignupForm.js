import { useContext , useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import Checkbox from '../../InputTool/Checkbox';
import Select from '../../InputTool/Select';
import TextInput from '../../InputTool/Input';
import * as Yup from 'yup';
import Axios from "axios";
import AuthContext from '../../../store/auth-context';
import classes from '../../Case/ApplyingForm.module.css';

// And now we can use these
const SignupForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [jobType, setJobType] = useState();
  const [edit, setEdit] = useState(true);

  const onchangehandler = () => { 
    setEdit(prevEdit => !prevEdit)
  }

  const jobs = [
  { value: '',
    label :'Select a job type'} ,
  { value: 'Designer' ,
    label: 'Designer' },
  { value: 'Developer',
    label: 'Developer' },
  { value: 'Product Manager',
    label: 'Product Manager' },
  { value: 'Other',
    label: 'Other'}]

    const inputs = [
      {label:"First Name",
       name:"firstName",
       type:"text",
       placeholder:{firstName},
       disabled:{edit}} ,
       {label:"Last Name",
       name:"lastName",
       type:"text",
       placeholder:{lastName},
       disabled:{edit}} ,
       {label:"Email",
       name:"email",
       type:"text",
       placeholder:{email},
       disabled:{edit}} ]



  async function getProfile(userid){
    const response = await Axios.get(`http://localhost:3001/profile/${userid}`,{
      token: authCtx.token,
    })
    return response.data}
  
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
    const profile = await getProfile(authCtx.userID)
    setFirstName(profile.result.firstname)
    setLastName(profile.result.lastname)
    setEmail(profile.result.email)
    setAcceptedTerms(profile.result.acceptedTerms)
    setJobType(profile.result.jobType)
    }
    fetchData()
    const profileExist = !firstName
    console.log(profileExist)}
    
  , []);
  
  async function onAddForm (values){

    if (firstName) {
      const response = await Axios.patch("http://localhost:3001/profile", {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        acceptedterms: values.acceptedTerms,
        jobtype: values.jobType,
        userid: authCtx.userID  }).then(()=>{ 
          console.log('send');
          return(
            response
          )})
    } else {
      const response = await Axios.post("http://localhost:3001/profile", {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        acceptedterms: values.acceptedTerms,
        jobtype: values.jobType,
        userid: authCtx.userID  }).then(()=>{ 
          console.log('send');
          return(
            response
          )})
        }
    }


  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          email: email,
          acceptedTerms: acceptedTerms, 
          jobType: jobType
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            // .required('Required'),
          ,lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            // .required('Required'),
          ,email: Yup.string()
            .email('Invalid email address')
            // .required('Required'),
          ,acceptedTerms: Yup.boolean()
            // .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            // .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values)
            onAddForm(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={classes.control}>
          <TextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder={firstName}
            disabled={edit}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder={lastName}
            disabled={edit}
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder={email}
            disabled={edit}
          />

          <Select id="jobType" label="Job Type" name="jobType" >
          {jobs.map((job) =>
          <option key={job.value} value={job.value} 
          selected={job.value===jobType?'selected':''}
        >{jobs.label}</option>
          )};
          </Select>

          <Checkbox name="acceptedTerms">
            I accept the terms and conditions
          </Checkbox>
          <div className={classes.actions}>
          <button type='button' onClick= {onchangehandler}>Edit</button>
          <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;