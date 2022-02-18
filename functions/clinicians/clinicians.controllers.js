const fs = require('firebase-admin');

const db = fs.firestore();
const cliniciansCollection = 'clinicians';


const addPatientToClinician = async (patient_ID, clinician_ID) => {
  
  try {
    
    const clinicianRef = db.collection(cliniciansCollection).doc(clinician_ID);
    const clinician = await clinicianRef.get();

  if (clinician && clinician.data().patients) {
      if(clinician.data().patients.includes(patient_ID)) {
        return {code: 400, message: "Patient already exists"}
      }

      var patientsArray = clinician.data().patients;
      patientsArray.push(patient_ID);
      await clinicianRef.update(JSON.parse(JSON.stringify({patients: patientsArray})));
      return {code: 200, message: "Patient was added to Clinician"}
  } else {
      return {code: 404, message: "Clinician was not found"}
  }
  } catch (err) {
    return {code: 404, message: "Clincian was not found"}
  }
  
}

exports.createClinician = async (req, res, next) => {
  const clinicianData = req.body;
  const clinician = await db.collection(cliniciansCollection).add(clinicianData);

  res.status(201).json({
    success: true,
    data: clinician,
  });
};

exports.deleteClinician = async (req, res, next) => {
  const id = req.params.id;
  const clinicianRef = db.collection(cliniciansCollection).doc(id);

  try {
    await clinicianRef.delete();

    res.status(200).json({
      success: true,
      data: {},
    });
  }
  catch (err) {
    res.status(404).json({
      success: false,
      data: {},
      message: `Failed to delete clinician with id ${id}`,
    });
  }
};

exports.getClinician = async (req, res, next) => {
  const id = req.params.id;
  const clinicianRef = db.collection(cliniciansCollection).doc(id);
  const clinician = await clinicianRef.get();

  if (!clinician || !clinician.exists) {
    return res.status(404).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    data: {
      id: clinician.id,
      ...clinician.data(),
    }
  });
};

exports.getClinicians = async (req, res, next) => {
  const { limit, select, where, ...reqQuery } = req.query;

  let query;
  let queryStr = JSON.stringify(reqQuery);
  query = db.collection(cliniciansCollection);

  if (select) {
    const fields = req.query.split(',').join(' ');
    query = query.select(fields);
  }

  if (limit) {
    const queryLimit = parseInt(limit, 10) || 25;
    query = query.limit(queryLimit);
  }

  const snapshot = await query.get(JSON.parse(queryStr));
  const clinicians = snapshot.docs.map((clinician) => (
    {
      id: clinician.id,
      ...clinician.data(),
    }
  ));

  res.status(200).json({
    success: true,
    count: clinicians.count,
    data: clinicians,
  });
};

exports.updateClinician = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const clinicianRef = db.collection(cliniciansCollection).doc(id);

  try {
    const clinician = await clinicianRef.update(data);

    res.status(200).json({
      success: true,
      data: clinician,
    });
  }
  catch (err) {
    return res.status(404).json({
      success: false,
    });
  }
};

exports.updateClinicianWithPatient = async (req, res, next) => {
  if(req.body.patient_ID && req.params.id){
    const clinicianId = req.params.id
    const patientId = req.body.patient_ID
    const response = await addPatientToClinician(patientId, clinicianId)

    res.status(response.code).json({
      success: response.code === 200 ? true : false,
      message: response.message
    })
  } else {
    res.status(400).json({
      success: false,
      message: "invalid body needs value: patient_ID"
    })
  }
}
