import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getCompanies, getHospitals, getAllHospitals } from "../../api/servicesApi";
import { useSelector } from 'react-redux'
import { signUpPerson } from "../../api/authApi/signUp";
import validatePersonData from "../../utils/addPersonValidation";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'

const CreatePerson = ({role}) => {

  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [type, setType] = useState("hospital"); // company or hospital or radio
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const [companies, setCompanies] = React.useState([]);
  const [hospitals, setHospitals] = React.useState([]);
  const [error, setError] = React.useState({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    cin: false,
    gender: false,
    birthDate: false,
    age: false,
    address: false,
    phone: false,
    email: false,
    secteur: false,
    fonction: false,
    poids: false,
    type: false,
    company: false,
    hospital: false,
  });
  const [personData, setPersonData] = React.useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    cin: '',
    gender: '',
    birthDate: moment().format("YYYY-MM-DD"),
    age: '',
    address: '',
    phone: '',
    email: '',
    poids: '',
    secteur: '',
    fonction: '',
    type: role === "hospital" ? "medical" : 'technical',
    company: null,
    hospital: null,
  });

  const addPerson = async () => {
    try {
      setBtnLoading(true);
      if (role === "company") personData.company = user.company._id;
      else if (role === "hospital") personData.hospital = user.hospital._id;
      const validation = validatePersonData(personData, error, setError);
      if (validation === 1) {
        const res = await signUpPerson(token, personData);
        if (res?.status === 200) {
          enqueueSnackbar('Professional Healthcare was created successfully', {variant: 'success'})
          navigate(`/${role}`);
        }
      } else enqueueSnackbar('Please Check your inputs', {variant: 'error'})
       
      setBtnLoading(false);  
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
      setBtnLoading(false);
    }
  }

  const getCompaniesData = async () => {
    try {
      const res = await getCompanies(token);
      setCompanies(res?.data?.data);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getHospitalsData = async (hospitalType) => {
    try {
      let res;
      console.log(hospitalType);
      if (hospitalType) {
        res = await getAllHospitals(token, hospitalType);
      } else  res = await getAllHospitals(token, "");
      setHospitals(res?.data?.data);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    getCompaniesData();
    getHospitalsData(type);
  }, [type]);

	return (
		<>
      {role !== "company" && 
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.type}>Professional Healthcare Type</InputLabel>
          <Select
            error={error.type}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Professional Healthcare Type"
            style={{width: "95%"}}
            value={personData.type}
            onChange={(e) => {
              // empty personData
              const old = {
                username: '',
                password: '',
                  firstName: '',
                  lastName: '',
                  cin: '',
                  gender: '',
                  birthDate: moment().format("YYYY-MM-DD"),
                  age: '',
                  address: '',
                  phone: '',
                  email: '',
                  poids:'',
                  secteur: '',
                  fonction: '',
                  type: 'technical',
                  company: null,
                  hospital: null,
                };
              setPersonData({...old,
                type: e.target.value,
              })}}
          >
            {(role === "admin" || role === "hospital") && <MenuItem value="medical">Medical</MenuItem>}
            <MenuItem value="technical">Technical</MenuItem>
          </Select>
        </FormControl>
      }
      <div style={{display: "flex"}}>
      {role === "admin" && <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
        <InputLabel id="demo-simple-select-label" error={error.type}>Type</InputLabel>
        <Select
          error={error.type}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type"
          style={{width: "95%"}}
          value={type}
          onChange={(e) => {
            setType(e.target.value);
         }}
        >
          <MenuItem value="company">Company</MenuItem>
          <MenuItem value="hospital">Hospital</MenuItem>
          <MenuItem value="radio">Radiology Center</MenuItem>
          <MenuItem value="clinic">Clinic</MenuItem>
        </Select>
      </FormControl>}
      {role === "admin" && type === "company" && (
      <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
        <InputLabel id="demo-simple-select-label" error={error.company} >Choose Company</InputLabel>
        <Select
          error={error.company}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose Company"
          style={{width: "95%"}}
          value={personData.company}
          onChange={(e) => {
            setError({...error, company: false});
            setPersonData({...personData,
            company: e.target.value,
          })}}
        >
          {companies?.map((company, index) => (
            <MenuItem value={company._id}>{company.designation}</MenuItem>
          ))}
        </Select>
      </FormControl>)}
      { role === "admin" && type === "hospital" && (
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.hospital}>Choose Hospital</InputLabel>
          <Select
            error={error.hospital}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Choose Hospital"
            style={{width: "95%"}}
            value={personData.hospital}
            onChange={(e) => {
              setError({...error,
                hospital: false,
              });
              setPersonData({...personData,
              hospital: e.target.value,
            })}}
          >
            {hospitals?.map((hospital, index) => (
              <MenuItem value={hospital._id}>{hospital.designation}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      { role === "admin" && type === "radio" && (
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.hospital}>Choose Radiology Center</InputLabel>
          <Select
            error={error.hospital}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Choose Radiology Center"
            style={{width: "95%"}}
            value={personData.hospital}
            onChange={(e) => {
              setError({...error,
                hospital: false,
              });
              setPersonData({...personData,
              hospital: e.target.value,
            })}}
          >
            {hospitals?.map((hospital, index) => (
              <MenuItem value={hospital._id}>{hospital.designation}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      { role === "admin" && type === "clinic" && (
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.hospital}>Choose Clinic</InputLabel>
          <Select
            error={error.hospital}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Choose Clinic"
            style={{width: "95%"}}
            value={personData.hospital}
            onChange={(e) => {
              setError({...error,
                hospital: false,
              });
              setPersonData({...personData,
              hospital: e.target.value,
            })}}
          >
            {hospitals?.map((hospital, index) => (
              <MenuItem value={hospital._id}>{hospital.designation}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.firstName}>FIRST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.firstName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.firstName}
            onChange={(e) => {
              setError({...error, firstName: false})
              setPersonData({...personData,
              firstName: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.lastName}>LAST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.lastName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.lastName}
            onChange={(e) => {
              setError({...error,
                lastName: false,
              })
              setPersonData({...personData,
              lastName: e.target.value,
            })}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.secteur}>{type === "company" || role === "company" ? "Modality Service" : "Activity service"}</InputLabel>
          <Input
            error={error.secteur}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Activity service<"
            style={{width: "90%"}}
            value={personData.secteur}
            onChange={(e) => {
              setError({...error, secteur: false});
              setPersonData({...personData,
              secteur: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.fonction}>Fonction</InputLabel>
          <Input type="text" id="my-input" 
             error={error.fonction}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.fonction}
            onChange={(e) => {
              setError({...error, fonction: false});
              setPersonData({...personData,
              fonction: e.target.value,
            })}}

          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.gender}>Gender</InputLabel>
          <Select
            error={error.gender}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            style={{width: "90%"}}
            value={personData.gender}
            onChange={(e) => {
              setError({...error,
                gender: false,
              });
              setPersonData({...personData,
              gender: e.target.value
            })}}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={1} style={{width: "90%", marginRight: "40px"}} error={error.birthDate}>
            <DesktopDatePicker
              label="Date of birth"
              inputFormat="YYYY-MM-DD"
              value={personData.birthDate}
              onChange={(newValue) => {
                setError({...error,
                  birthDate: false,
                });
                const currentYear = moment().format("YYYY");
                const age = currentYear - newValue.format("YYYY");
                setPersonData({...personData,
                  birthDate: newValue.format("YYYY-MM-DD"),
                  age: age,
                });
              }}             
              renderInput={(params) => <TextField {...params} error={error.birthDate} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div style={{display: "flex"}}> {/* phone and age */}
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone}>PHONE</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={personData.phone}
            onChange={(e) => {
              setError({...error,
                phone: false,
              });
              setPersonData({...personData,
              phone: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.email}>EMAIL</InputLabel>
          <Input type="email" id="my-input"
            error={error.email} 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={personData.email}
            onChange={(e) => {
              setError({...error,
                email: false,
              });
              setPersonData({...personData,
              email: e.target.value,
            })}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.cin}>CIN</InputLabel>
          <Input type="text" id="my-input" 
            error={error.cin}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={personData.cin}
            onChange={(e) => {
              setError({...error,
                cin: false,
              })
              setPersonData({...personData,
              cin: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.address}>ADDRESS</InputLabel>
          <Input type="text" id="my-input" 
            error={error.address}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={personData.address}
            onChange={(e) => {
              setError({...error,
                address: false,
              });
              setPersonData({...personData,
              address: e.target.value,
            })}}
          />
        </FormControl>
        
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.poids} >Weight</InputLabel>
          <Input type="number" id="my-input" 
             error={error.poids}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.poids}
            onChange={(e) => {
              setError({...error,
                poids: false,
              });
              setPersonData({...personData,
              poids: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}} disabled>
          <InputLabel htmlFor="my-input">{personData?.age || "Age"}</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
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
            value={personData.username}
            onChange={(e) => {
              setError({...error, username: false});
              setPersonData({...personData,
              username: e.target.value,
            })}}

          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Passwrod</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.password}
            onChange={(e) => {
              setError({...error,
                password: false,
              });
              setPersonData({...personData,
              password: e.target.value,
            })}}

          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button disabled={btnLoading} onClick={addPerson} variant="contained" fullWidth>Add {personData.type} Person</Button>
      </Stack>
		</>
  );
}

export default CreatePerson;