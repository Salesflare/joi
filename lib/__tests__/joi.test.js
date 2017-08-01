const Joi = require('../index.js');

describe('joi', function () {
  it('is our custom Joi', function () {
    expect(Joi.string().phoneNumber).toBeInstanceOf(Function);
  });
});
