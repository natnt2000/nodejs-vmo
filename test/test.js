process.env.NODE_ENV = "test"

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const mongoose = require('mongoose')
const {expect} = require('chai')
// const server = require('../app')

chai.use(chaiHttp)

describe('Test Restful API', () => {
    before(done => {
        return mongoose.connect( process.env.DB_CONNECTION, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => {
                console.log('Connected to DB')
                done()
            })
    })

    
    after(done => {
        mongoose.disconnect()
        .then(() => {
            
            done()
        })
        .catch(err => done(err))
    })

    it('it should get all user on /api/users GET', (done) => {
        chai.request(app)
        .get('/api/users')
        .end((err, res) => {
            expect(res.body.length).equal(6)
            done()
        })
    })


    it('it should get one user by _id /api/users/:id GET', done => {
        chai.request(app)
        .get('/api/users/5fbf7bf3f17ba32a6830c337')
        .end((err, res) => {
            expect(res.body.username).equal('pna2000')
            done()
        })
    })
    
    
})