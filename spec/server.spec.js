// var expect  = require('chai').expect;
// // const chai = require('chai');
// // const should = chai.should();
// var request = require('request');


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;



const server = require('../src/server');

// it('Main page content', function(done) {
//     request('http://localhost:3000' , function(error, response, body) {
//         expect(body).to.equal('Miguel Vargass');
//         done();
//     });
// });


describe('Insert a country: ',()=>{
    it('should insert a country', (done) => {
        chai.request(url)
            .get('/')
            .end( function(err,res){
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});


