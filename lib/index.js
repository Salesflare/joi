'use strict';

const Joi = require('joi');
const JoiPhoneNumber = require('joi-phone-number');
const JoiDateString = require('@salesflare/joi-date-string');

/**
 * Custom joi with added functionality
 */
module.exports = Joi.extend(JoiPhoneNumber).extend(JoiDateString);
