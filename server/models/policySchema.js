const mongoose = require('mongoose');

const Policy = new mongoose.Schema({
    description: {
        type: 'string',
        required: true,
        default: "Terms and Conditions"
    }
})

const policySchema = mongoose.model("Policy", Policy);

module.exports = policySchema;