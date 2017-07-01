const request = require('supertest');
const express = require('express');
const should = require('should');
const mongoose = require('mongoose');
const app = require('../server.js');

const agent = request.agent(app);

const WardModel = mongoose.model('Ward');
 
describe('ward routes', function() {
  it('should return all wards', (done) => {
    agent
      .get('/wards')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.should.be.an.Array();
        done();
      });
  });

  const ward = { name: "testWard", bedCount: 20, desciption: "test Description"};
  let wardId = "";

  it('should add a new ward', () => {
    agent
      .post('/wards')
      .send(ward)
      .expect(201)
      .end(function (err, res) {
        wardId = res.body._id;
        res.body.should.be.an.Object().and.have.property('_id');
        done();
      });
  });

});