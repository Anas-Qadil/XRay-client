import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { checkHospital } from "../../utils/checkHospital";
import { signUpHospital } from "../../api/authApi/signUp";
import { useSnackbar } from 'notistack'


const CreateHospital = ({role, type}) => {
  
  const { enqueueSnackbar } = useSnackbar();
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const [error, setError] = useState({
    username: false,
    password: false,
    address: false,
    region: false,
    ville: false,
    statut: false,
    designation: false,
    email: false,
    phone: false,
  });
  const [hospitalData, setHospitalData] = useState({
    username: '',
    password: '',
    address: '',
    region: '',
    statut: '',
    ville: '',
    designation: '',
    type: type || "hospital",
    email: '',
    phone: '',
  });

  const addHospital =  async () => {
    try {
      setBtnLoading(true);
      if (!checkHospital(hospitalData, setError)) {
        const res = await signUpHospital(token, hospitalData);
        if (res.status === 200 || res.status === 201) {
          enqueueSnackbar('Hospital was created successfully', {variant: 'success'})
          navigate(`/${role}`); 
        }
      } else 
        enqueueSnackbar('Please Check your inputs', {variant: 'error'});
        
      setBtnLoading(false);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
      setBtnLoading(false);
    }
  }

	return (
		<>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.designation}>Designation</InputLabel>
          <Input type="text" id="my-input" 
            error={error.designation}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.designation}
            onChange={(e) => {
              setError({...error, designation: false});
              setHospitalData({ ...hospitalData, designation: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.statut}>Statut</InputLabel>
          <Input type="text" id="my-input" 
            error={error.statut}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.statut}
            onChange={(e) => {
              setError({...error, statut: false});
              setHospitalData({ ...hospitalData, statut: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}> {/* phone and age */}
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.region} >Region</InputLabel>
          <Input type="text" id="my-input" 
            error={error.region}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.region}
            onChange={(e) => {
              setError({...error, region: false});
              setHospitalData({ ...hospitalData, region: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.ville}>Ville</InputLabel>
          <Input type="text" id="my-input" 
            error={error.ville}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.ville}
            onChange={(e) => {
              setError({...error, ville: false});
              setHospitalData({ ...hospitalData, ville: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone}>Phone</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.phone}
            onChange={(e) => {
              setError({...error, phone: false});
              setHospitalData({ ...hospitalData, phone: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.email}>Email</InputLabel>
          <Input type="text" id="my-input" 
            error={error.email}
            aria-describedby="my-helper-text" 
            style={{width: "95%"}} 
            value={hospitalData.email}
            onChange={(e) => {
              setError({...error, email: false});
              setHospitalData({ ...hospitalData, email: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
       <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.address}>Address</InputLabel>
          <Input type="text" id="my-input" 
            error={error.address}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.address}
            onChange={(e) => {
              setError({...error, address: false});
              setHospitalData({ ...hospitalData, address: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.username}>Username</InputLabel>
          <Input type="text" id="my-input" 
            error={error.username}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.username}
            onChange={(e) => {
              setError({...error, username: false});
              setHospitalData({ ...hospitalData, username: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Password</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.password}
            onChange={(e) => {
              setError({...error, password: false});
              setHospitalData({ ...hospitalData, password: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button disabled={btnLoading} variant="contained" onClick={addHospital} fullWidth>Add Hospital</Button>
      </Stack>
		</>
  );
}

export default CreateHospital;