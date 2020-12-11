process.env.NODE_ENV = "test"

import app from '../app.js'
import chai from 'chai'
const { expect } = chai
import chaiHttp from 'chai-http'
import User from '../models/User.js'
chai.use(chaiHttp)


describe('Test Restful API', () => {
    let access_token
    const account = {
        username: 'natnt2k',
        password: 'huytay95'
    }

    describe('POST /login', () => {
        it ('login successfully', done => {
            chai
            .request(app)
            .post('/login')
            .send(account)
            .end((err, res) => {
                access_token = res.body.access_token
                // refresh_token = res.body.refresh_token

                expect(res.body).to.include.all.keys('access_token', 'refresh_token')
                expect(res.status).equal(200)
                done()
            })
        })

    })

    describe('GET /api/users', () => {
        it('it should get all user on /api/users GET', done => {
            chai
                .request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${access_token}`)
                .end((err, res) => {
                    expect(res.status).equal(200)
                    expect(res.body).to.be.an('array').that.is.not.empty
                    res.body.forEach(ele => {
                        expect(ele).to.include.all.keys('_id', 'created_at', 'username', 'password', 'firstname', 'lastname', 'role', '__v')
                    });
                    done()
                })
        })
    })



    describe('Test GET one user', () => {
        const user_id = "5fc4bdb07e194d1558a5955c"
        it('it should get one user by _id /api/users/:id GET', done => {
            chai.request(app)
                .get(`/api/users/${user_id}`)
                .set('Authorization', `Bearer ${access_token}`)
                .end((err, res) => {
                    expect(res.body).to.include.all.keys('_id', 'created_at', 'username', 'password', 'firstname', 'lastname', 'role', '__v')
                    expect(res.body.username).equal('hashpassword')
                    done()
                })
        })
    })

    // describe('Test POST create new user', () => {
    //     let saveUserStub;
    //     const data = {
    //         username: "nodejs1",
    //         password: "huytay95",
    //         firstname: "node",
    //         lastname: "JS hehe",
    //         role: "super_admin"
    //     }
    //     beforeEach(() => {
    //         saveUserStub = stub(new User(data), 'save')
    //     })
    //     afterEach(() => {
    //         saveUserStub.restore()
    //     })

    //     it('it should create new user on /api/users POST', done => {
    //         chai
    //             .request(app)
    //             .post('/api/users/')
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).equal(200)
    //                 expect(res.error.text).is.not.exist
    //                 expect(res.body).to.include.all.keys('_id', 'created_at', 'username', 'password', 'firstname', 'lastname', 'role', '__v')
    //                 done()
    //             })
    //     })
    // })
})