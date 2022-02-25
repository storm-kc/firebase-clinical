const ep = require('./patients.json')

class Patient {

    static schema = {
        name: {},
        dob: {
            isDate: true,
        },
        assignedSex: {
            isIn: {
                options: ['M', 'F'],
            }
        },
        height: {},
        weight: {},
        address: {},
        phone: {},
        email: {
            isEmail: true,
            normalizeEmail: true,
        },
        deceased: {
            isBoolean: true,
            toBoolean: true,
        },
        preExistingCondition: {},
        network: {},
        records: {},
        'emergencyContact.email': {
            isEmail: true,
            normalizeEmail: true,
        },
    }

    constructor(name, dob, assignedSex, height, weight, address, phone, email, deceased,preExistingCondition, network, records, emergencyContact ){
        this.name = name;
        this.dob = dob;
        this.assignedSex = assignedSex;
        this.height = height;
        this.weight = weight;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.deceased = deceased;
        this.preExistingCondition = preExistingCondition;
        this.network = network;
        this.records = records;
        this.emergencyContact = emergencyContact
    }
}

const generateTestPatient = () => {
    const testPatient = new Patient(ep.name, ep.dob, ep.assignedSex, ep.height, ep.weight, ep.address, ep.phone, ep.email, ep.deceased, ep.preExistingCondition, ep.network, ep.records, ep.emergencyContact);
    return testPatient;
}

const createPatientBasedOnBody = (body) => {
    const patientBody = new Patient(
        body.name ? body.name : "placeholder",
        body.dob ? body.dob : "1/1/0001",
        body.assignedSex ? body.assignedSex : "placeholder",
        body.height ? body.height : 0,
        body.weight ? body.weight : 0,
        body.address ? body.address : "placeholder",
        body.phone ? body.phone : 0,
        body.email ? body.email : "placeholder@test.com",
        body.deceased ? body.deceased : false,
        body.preExistingCondition ? body.preExistingCondition : [],
        body.network ? body.network : "placeholder",
        body.records ? body.records : [],
        body.emergencyContact ? body.emergencyContact : {},
    );
    return patientBody;
}

module.exports = { Patient, generateTestPatient, createPatientBasedOnBody}
