'use strict';

const Joi = require('joi');
const JoiPhoneNumber = require('joi-phone-number');

/**
 * Custom joi with added functionality
 */
module.exports = Joi.extend(JoiPhoneNumber);
