const Joi = require('../index.js');

describe('joi', function () {
  it('has the phonenumber rule', function () {
    expect(Joi.string().phoneNumber).toBeInstanceOf(Function);
  });
  it('has the dateString rule', function () {
    expect(Joi.dateString).toBeInstanceOf(Function);
  });
});
