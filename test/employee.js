/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');

chai.should();
chai.use(chaihttp);

let id;
// please enter JWT token here.
let token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFmc2Fyc2hhaWtoODdAZ21haWwuY29tIiwiaWF0IjoxNzAxODQ1NDk4LCJleHAiOjE3MDE4NDY2OTh9.kNqf3C9UB6nEakk48Oeb2ZhHv-nfmIcA9_ZD9Xd6lOw';

describe('Employee Crud', () => {
  describe('Add Employee', () => {
    it('Add new employee', (done) => {
      chai.request(app)
        .post('/employee/add')
        .set('Authorization', token)
        .send({
          name: 'Afsar Shaikh',
          email: 'afsar@gmail.com',
          dob: '1994-08-09',
          designation: 'Senior Software Engineer',
          education: 'BE',
        })
        .end((error, response) => {
          id = response.body.newEmployee._id;
          response.body.should.be.a('object');
          response.body.should.have.property('newEmployee');

          done();
        });
    });
  });
  describe('Get Employee', () => {
    it('fetch all employee list', (done) => {
      chai.request(app)
        .get('/employee/get')
        .set('Authorization', token)
        .query({
          sortedColumn: 'education',
          limit: 5,
          page: 1,
          sort: 'asc',
        })
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('employees');
          response.body.should.have.property('page');
          response.body.should.have.property('totalPages');
          response.body.should.have.property('totalEmployees');
          response.body.should.have.property('sortedColumn');
          response.body.should.have.property('sortDirection');
          done();
        });
    });
  });
  describe('Update Employee', () => {
    it('Update employee data', (done) => {
      chai.request(app)
        .put(`/employee/update/${id}`)
        .set('Authorization', token)
        .send({
          name: 'Afsar Shaikh 111',
        })
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have
            .property('message')
            .eql('Updated Successfully');
          done();
        });
    });
  });
  describe('Delete Employee', () => {
    it('delete employee by id', (done) => {
      chai.request(app)
        .delete(`/employee/delete/${id}`)
        .set('Authorization', token)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have
            .property('message')
            .eql(`Employee deleted successfully for id - ${id}`);
          done();
        });
    });
  });
});
