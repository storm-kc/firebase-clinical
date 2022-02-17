const fs = require('firebase-admin');

const db = fs.firestore();
const cliniciansCollection = 'clinicians';

exports.createClinician = async (req, res, next) => {
  const clinicianData = req.body;
  const clinician = await db.collection(cliniciansCollection).add(clinicianData);

  res.status(201).json({
    success: true,
    data: clinician,
  });
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
