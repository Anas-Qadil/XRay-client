import React from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/material';
import Paper from "@mui/material/Paper";
import moment from "moment";
import CreatePerson from "./CreatePerson";
import CreatePatient from "./createPatient";
import CreateHospital from "./createHospital";
import CreateCompany from "./createCompany";
import BGImage from "../../assets/5415687.jpg"

const CreateAccount = ({role}) => {
  
  const [accountType, setAccountType] = React.useState('person'); // patient or person

	return (
  <div className="home">
    <Sidebar role={role} />
    <div className="homeContainer"
      style={{
        background:`linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.3)), url(${BGImage})`,
        backgroundSize: 'cover',
      }}
    >
      {/* <Navbar /> */}
      <Container  component={Paper} maxWidth="md" style={{paddingBottom: "38px", paddingTop: "15px"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Create Account</h1>
        { role !== "company" &&
          <FormControl fullWidth style={{marginBottom: "20px"}}>
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              label="Account Type"
            >
              {(role === "admin" || role === "hospital") && <MenuItem value="patient">Patient</MenuItem>}
              {(role === "admin" || role === "hospital" || role === "company") && <MenuItem value="person">Professional Healthcare</MenuItem>}
              {role === "admin" && <MenuItem value="company">Company</MenuItem>}
              {role === "admin" && <MenuItem value="hospital">Hospital</MenuItem>}
              {role === "admin" && <MenuItem value="radio">Radiology Center</MenuItem>}
              {role === "admin" && <MenuItem value="clinic">Clinic</MenuItem>}
            </Select>
          </FormControl>
        }
        <br />
        <hr />
        <br />
        {accountType === "person" && <CreatePerson role={role} />}
        {accountType === "patient" && <CreatePatient role={role}  />}
        {accountType === "hospital" && <CreateHospital role={role} type="hospital" />}
        {accountType === "radio" && <CreateHospital role={role} type="radio" />}
        {accountType === "clinic" && <CreateHospital role={role} type="clinic" />}
        {accountType === "company" && <CreateCompany role={role} />}
      </Container>
      </div>
  </div>
  );
}

export default CreateAccount;


