'use strict';

const Joi = require('@hapi/joi');
const Bourne = require('@hapi/bourne');
const JoiPhoneNumber = require('joi-phone-number');
const JoiDateString = require('@salesflare/joi-date-string');

/**
 * Custom joi with added functionality
 */
module.exports = Joi
  .extend(JoiPhoneNumber)
  .extend(JoiDateString)
  // Allow for Object and Array string coercion
  // Taken from https://github.com/hapijs/joi/issues/2037 and https://github.com/hapijs/joi/commit/521811e90171c1d88a023aa15faef0e7ff4a0272#diff-6a30cc19e56010933d38678d40cbd1bdR1428
  .extend({
    type: 'object',
    base: Joi.object(),
    coerce: {
      from: 'string',
      method(value) {
        if (value[0] !== '{' && !/^\s*\{/.test(value)) {
          return;
        }

        try {
          return {value: Bourne.parse(value)};
        } catch (ignoreErr) { } // eslint-disable-line no-unused-vars
      }
    }
  })
  .extend({
    type: 'array',
    base: Joi.array(),
    coerce: {
      from: 'string',
      method(value) {
        if (typeof value !== 'string' || (value[0] !== '[' && !/^\s*\[/.test(value))) {
          return;
        }

        try {
          return {value: Bourne.parse(value)};
        } catch (ignoreErr) { } // eslint-disable-line no-unused-vars
      }
    }
  });
