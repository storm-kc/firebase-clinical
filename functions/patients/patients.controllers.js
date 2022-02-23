const fs = require('firebase-admin');

const db = fs.firestore(); 
const patientsCollections = 'patients';

const {Patient, generateTestPatient, createPatientBasedOnBody} = require('./patient')

// @desc    Get all patients
// @route   Get /patients
// @access  Public
exports.getPatients = async (req, res, next) => {
    let query;

    // Copy req.query and exclude adv query fields
    const { where, select, limit, ...reqQuery } = req.query;

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    query = db.collection(patientsCollections);
    
    // Select fields
    if (select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (limit) {
        const queryLimit = parseInt(limit, 10) || 25;
        query = query.limit(queryLimit)
    }

    // Executing query
    const snapshot = await query.get(reqQuery);

    const patients = snapshot.docs.map(patient => (
        {
           id: patient.id,
           ...patient.data()
        }
    ));

    res.status(200).json({ 
        success: true, 
        count: patients.length,
        data: patients,
    });  
};


// @desc    Get single patient
// @route   Get /pateint/:id
// @access  Public
exports.getPatient = async (req, res, next) => {
    const id = req.params.id;
    const patRef = db.collection(patientsCollections).doc(id);
    const patient = await patRef.get();

    if (!patient) {
        return res.status(404).json({
            success: false
        })
    }

    res.status(200).json({ 
        success: true, 
        data: {
            id: patient.id,
            ...patient.data(),
        }
    }); 
}

// @desc    Create single patient
// @route   Post /patient/:id
// @access  Public
exports.createPatient = async (req, res, next) => {
    try {
        const patientInfo = req.body ? createPatientBasedOnBody(req.body) : generateTestPatient();
        
        const patient = await db.collection(patientsCollections).add(JSON.parse(JSON.stringify(patientInfo)));
  
        res.status(201).json({
          success: true,
          data: patient,
        });
    }
    catch(err){
        res.status(404).json({ 
            success: false, 
            data: {},
            message: `Failed to Create new Patient record`
        }); 
    }
  };

    // @desc    Updates patient values
    // @route   Put /patient/:id
    // @access  Public
    exports.updatePatient = async (req, res, next) => {
        try {
        const id = req.params.id;
        const patientInfo = req.body
        
        const patient = await db.collection(patientsCollections).doc(id).update(JSON.parse(JSON.stringify(patientInfo)));
  
        res.status(201).json({
          success: true,
          data: patient,
        });
    }
    catch(err){
        res.status(404).json({ 
            success: false, 
            data: {},
            message: `Failed to update Patient record ${id}`
        }); 
    }
    }


// @desc    Delete single patient
// @route   Delete /patients/:id
// @access  Public
exports.deletePatient = async (req, res, next) => {
    const id = req.params.id;
    const patRef = db.collection(patientsCollections).doc(id);

    try {
        await patRef.delete();

        res.status(200).json({ 
            success: true, 
            data: {},
    
        }); 
    }
    catch(err){
        res.status(404).json({ 
            success: false, 
            data: {},
            message: `Failed to Delete Patient with id ${id}`
    
        }); 
    }
}