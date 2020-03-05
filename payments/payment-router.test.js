const request = require('supertest');

const server = require('../api/server.js');

describe('payment router', function() {
    it('should run the tests', function() {
        expect(true).toBe(true);
    })

    describe('POST /', function() {
        it('should return a 404 error', function() {
            return request(server)
            .post('/api/payment')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
    })

    
})