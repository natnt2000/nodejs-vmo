process.env.NODE_ENV = "test"

import app from '../app.js'
import chai from 'chai'
const { expect } = chai
import chaiHttp from 'chai-http'
chai.use(chaiHttp)


describe('Test Restful API', () => {
    let access_token, newUserId
    const account = {
        username: 'natnt2k',
        password: 'huytay95'
    }

    describe('POST /login', () => {
        it('login successfully', done => {
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
                        expect(ele).to.include.all.keys('_id', 'createdAt', 'updatedAt', 'username', 'password', 'firstname', 'lastname', 'role', '__v')
                    });
                    done()
                })
        })
    })



    describe('Test GET one user', () => {
        const user_id = "5fd9d14f6c2ddd100c3a721c"
        it('it should get one user by _id /api/users/:id GET', done => {
            chai
                .request(app)
                .get(`/api/users/${user_id}`)
                .set('Authorization', `Bearer ${access_token}`)
                .end((err, res) => {
                    expect(res.body).to.include.all.keys('_id', 'createdAt', 'updatedAt', 'username', 'password', 'firstname', 'lastname', 'role', '__v')
                    expect(res.body.username).equal('hoiconcac89')
                    done()
                })
        })
    })

    describe('Test POST create new user', () => {
        const dataStore = {
            username: "nodejs1",
            password: "huytay95",
            firstname: "node",
            lastname: "JS hehe",
            role: "super_admin"
        }

        it('it should create new user on /api/users POST', done => {
            chai
                .request(app)
                .post('/api/users/')
                .send(dataStore)
                .set('Authorization', `Bearer ${access_token}`)
                .end((err, res) => {
                    newUserId = res.body._id
                    expect(res.status).equal(200)
                    expect(res.error.text).is.not.exist
                    expect(res.body).to.include.all.keys('_id', 'createdAt', 'updatedAt', 'username', 'password', 'firstname', 'lastname', 'role', '__v')
                    done()
                })
        })
    })

    describe('Test update one user by id PUT /api/users/:id', () => {
        const dataUpdate = {
            username: "nodejs1",
            password: "huytay95",
            firstname: "Pham",
            lastname: "Ngoc Anh",
            role: "admin"
        }

        it(`should update user by id`, done => {
            chai
                .request(app)
                .put(`/api/users/${newUserId}`)
                .send(dataUpdate)
                .set('Authorization', `Bearer ${access_token}`)
                .end((err, res) => {
                    expect(res.status).equal(200)
                    expect(res.error.text).is.not.exist
                    expect(res.body.nModified).equal(1)
                    expect(res.body.n).equal(1)
                    expect(res.body.ok).equal(1)
                    done()
                })

        })
    })

    describe('Test delete one user by id DELETE /api/users/:id', () => {
        it(`should delete one user by id`, done => {
            chai
                .request(app)
                .delete(`/api/users/${newUserId}`)
                .set('Authorization', `Bearer ${access_token}`)
                .end((err, res) => {
                    expect(res.status).equal(200)
                    expect(res.error.text).is.not.exist
                    expect(res.body.deletedCount).equal(1)
                    expect(res.body.n).equal(1)
                    expect(res.body.ok).equal(1)
                    done()
                })
        })
    })
})