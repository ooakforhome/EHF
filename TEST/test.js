const assert = require('assert');
const mongoose = require('mongoose');
const expect  = require('chai').expect;
const request = require('request');
const axios = require('axios');


const base_url = "http://localhost:3080/";
const Admin = require('../server/models/Admin');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
    it('this is another test that should pass', (done)=>{
      assert.equal(5, 3+2);
      done();
    });
    it('should just test something', (done)=>{
      assert.equal(10, 2*5);
      done();
    });
  });
});
