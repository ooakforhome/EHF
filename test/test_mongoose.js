const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Admin = require('../server/models/Admin');
const User = require('../server/models/User')

// https://medium.com/nongaap/beginners-guide-to-writing-mongodb-mongoose-unit-tests-using-mocha-chai-ab5bdf3d3b1d

describe("Database test", ()=>{
  before((done)=>{
    mongoose.connect('mongodb://ehfadmin:ehf1234@localhost:27017/ehf', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function(){
      console.log("working database");
      done();
    });
  });

  describe('Test Database now', ()=>{

    it('Dont save incorrect format', (done)=>{
      const wrongAdmin = Admin({noname: 'nothing'});
      wrongAdmin.save(err => {
        if(err){ return done();}
        throw new Error('Should generate error!');
      });
    });
    it('let\'s save a admin user', (done)=>{
      const newUser = new User();
      newUser.email= "abc@abc.com"
      newUser.password = "abc"
      newUser.save((err, user) => {
        if(err){ throw err }
        return done()
      })
    });
    it('Should retrieve data from test database', (done)=>{
      Admin.find({email: "aaa@aaa.com"}, (err, name)=>{
        if(err){throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Remove a data name', (done)=>{
      Admin.remove({email:"abc@abc.com"});
      done();
    });
    it('Make sure data name is removed', (done)=>{
      Admin.find({email: "abc@abc.com"}, (err, name)=>{
        if(err){throw new Error("didnt delete");}
        if(name.length === 0){ return "detelete"}
        done();
      });
    });
  });

});
