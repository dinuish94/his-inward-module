const request = require('supertest');
const express = require('express');
const should = require('should');
const mongoose = require('mongoose');
const app = require('../server.js');

const agent = request.agent(app);

const BedModel = mongoose.model('Bed');
 
describe('bed routes', function() {

  const bed = { type: "testType"};
  let bedId = "";

  it('should add a new bed', () => {
    agent
      .post('/beds/7')
      .send(bed)
      .expect(201)
      .end(function (err, res) {
        bedId = res.body._id;
        res.body.should.be.an.Object().and.have.property('_id');
        done();
      });
  });

});