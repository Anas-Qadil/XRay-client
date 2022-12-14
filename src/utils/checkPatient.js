import validator from "validator";

const checkPatientData = (obj, setError) => {
	let checker = 0;
	const err = {
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
		poids: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    }
		else if (!obj[key]) {
			err[key] = true;
		}
	});
	setError(err);
	Object.keys(err).map((key) => {
	  if (err[key]) {
		checker = 1;
	  }
	});
	return (checker);
}

const checkUpdatePatientData = (obj, setError) => {
	let checker = 0;
	const err = {
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
		poids: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    }
		else if (!obj[key] && key !== "password") {
			err[key] = true;
		}
	});
	setError(err);
	Object.keys(err).map((key) => {
	  if (err[key]) {
		  checker = 1;
	  }
	});
	return (checker);
}

const checkUpdatePersonData = (obj, setError) => {
	let checker = 0;
	const err = {
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
    type: false,
    company: false,
    hospital: false,
    poids: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    } else if (key === "hospital" || key === "company") {
        if (!obj["hospital"] && !obj["company"]) {
          err[key] = true;
        }
    }
		else if (!obj[key] && key !== "password") {
			err[key] = true;
		}
	});
	setError(err);
	Object.keys(err).map((key) => {
	  if (err[key]) {
		  checker = 1;
	  }
	});
	return (checker);
}
  
export { 
  checkPatientData,
  checkUpdatePatientData,
  checkUpdatePersonData
}