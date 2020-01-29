const Joi = require('../index.js');

describe('joi', function () {
  it('has the phonenumber rule', function () {
    expect(Joi.string().phoneNumber).toBeInstanceOf(Function);
  });
  it('has the dateString rule', function () {
    expect(Joi.dateString).toBeInstanceOf(Function);
  });
  // Tests taken from https://github.com/hapijs/joi/blob/a9b5c3c0c4eea9772fcf06781cb347d64438f7ad/test/extend.js#L1515-L1608
  it('coerces string object to object', function () {
    expect(Joi.object().validate('{"hi":true}')).toStrictEqual({value: {hi: true}});
    expect(Joi.object().validate(' \n\r\t{ \n\r\t"hi" \n\r\t: \n\r\ttrue \n\r\t} \n\r\t')).toStrictEqual({value: {hi: true}});
    expect(Joi.object().strict().validate('{"hi":true}').error).toBeInstanceOf(Error);
    expect(Joi.object().strict().validate('{"hi":true}').error.message).toEqual('"value" must be of type object');
    expect(() => Joi.attempt({a: '{"c":"string"}'}, Joi.object({a: Joi.object({b: Joi.string()})}))).toThrow(/"a.c" is not allowed/);

    const err1 = Joi.object().validate('a string').error;
    expect(err1).toBeInstanceOf(Error);
    expect(err1.message).toEqual('"value" must be of type object');
    expect(err1.details).toStrictEqual([{
      message: '"value" must be of type object',
      path: [],
      type: 'object.base',
      context: {label: 'value', value: 'a string', type: 'object'}
    }]);

    const err2 = Joi.object({a: Joi.object({b: Joi.object({c: {d: Joi.string()}})})}).validate({a: '{"b":{"c":{"d":1}}}'}, {abortEarly: false}).error;
    expect(err2).toBeInstanceOf(Error);
    expect(err2.message).toEqual('"a.b.c.d" must be a string');
    expect(err2.details).toStrictEqual([{
      message: '"a.b.c.d" must be a string',
      path: ['a', 'b', 'c', 'd'],
      type: 'string.base',
      context: {value: 1, label: 'a.b.c.d', key: 'd'}
    }]);

    expect(err2.annotate(true)).toStrictEqual('{\n  "a" [1]: "{\\"b\\":{\\"c\\":{\\"d\\":1}}}"\n}\n\n[1] "a.b.c.d" must be a string');
  });
  it('coerces string array to array', function () {
    expect(Joi.array().validate('[1,2,3]')).toStrictEqual({value: [1, 2, 3]});
    expect(Joi.array().validate(' \n\r\t[ \n\r\t1 \n\r\t, \n\r\t2,3] \n\r\t')).toStrictEqual({value: [1, 2, 3]});
    expect(Joi.object({a: Joi.array()}).validate({a: '[1,2]'}).error).toBe(undefined);

    const err1 = Joi.array().validate('{ "something": false }').error;
    expect(err1).toBeInstanceOf(Error);
    expect(err1.message).toEqual('"value" must be an array');
    expect(err1.details).toStrictEqual([{
      message: '"value" must be an array',
      path: [],
      type: 'array.base',
      context: {label: 'value', value: '{ "something": false }'}
    }]);

    const err2 = Joi.array().validate(' \n\r\t[ \n\r\t1 \n\r\t, \n\r\t2,3 \n\r\t').error;
    expect(err2).toBeInstanceOf(Error);
    expect(err2.message).toEqual('"value" must be an array');
    expect(err2.details).toStrictEqual([{
      message: '"value" must be an array',
      path: [],
      type: 'array.base',
      context: {label: 'value', value: ' \n\r\t[ \n\r\t1 \n\r\t, \n\r\t2,3 \n\r\t'}
    }]);
  });
});
