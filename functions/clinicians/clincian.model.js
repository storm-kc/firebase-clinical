class Clinician {
  
  // https://express-validator.github.io/docs/schema-validation.html
  static schema = {
    name: {
      isLength: {
        options: { min: 1 },
      }
    },
    age: {
      isInt: true,
      toInt: true,
    },
    patients: {},
    appointments: {},
    networks: {},
    practice: {},
  }

  constructor(name, age, patients, appointments, networks, practice) {
    this.name = name;
    this.age = age;
    this.patients = patients;
    this.appointments = appointments;
    this.networks = networks;
    this.practice = practice;
  }
}

const createClinician = (data) => {
  const clinicianData = new Clinician(
    data.name || '',
    data.age || '',
    data.patients || [],
    data.appointments || [],
    data.networks || [],
    data.practice || '',
  );
  return clinicianData;
};

module.exports = { Clinician, createClinician };
