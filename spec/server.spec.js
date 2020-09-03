let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');

//Assertion Style
chai.should();
chai.use(chaiHttp);


describe('Tareas API', () => {
    /**
     * Test GET
     */
    describe("Get users", () => {
        it("Traer todos los usuarios", (done) => {
            chai.request(server)
                .get("/").end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eq(3);
                done();
            })
        });

        it("Dado que la url es erronea, no debe traer usuarios", (done) => {
            chai.request(server)
                .get("/usr")
                .end((error, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * Test GET por ID
     */
    describe("Get user /user/:id", () => {
        it("Dado que se pasa el id del usuario por parametro entonces se debe retornar", (done) => {
            const userId = 1;
            chai.request(server)
                .get("/user/" + userId)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('completed');
                    res.body.should.have.property('id').eq(1);
                    done();
                });
        });

        it("Dado que se pasa el id del usuario por parametro entonces se debe retornar", (done) => {
            const userId = 123;
            chai.request(server)
                .get("/user/" + userId)
                .end((error, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("Usuario no encontrado");
                    done();
                });
        });
    });

    /**
     * Test POST
     */

    describe("POST user /", () => {
        it("Insertar un nuevo usuario", (done) => {
            const user = {
                name: "Tester",
                completed: true
            };
            chai.request(server)
                .post("/")
                .send(user)
                .end((error, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('id').eq(4);
                    res.body.should.have.property('name').eq("Tester");
                    res.body.should.have.property('completed').eq(true);
                    done();
                });
        });
    });

    /**
     * Test PUT
     */

    describe("PUT user /:id", () => {
        it("Dado que se pasa el id del usuario por parametro y esiste entonces se debe actualizar", (done) => {
            const userId = 1;
            const user = {
                name: "Tester changed",
                completed: true
            };
            chai.request(server)
                .put("/" + userId)
                .send(user)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('id').eq(1);
                    res.body.should.have.property('name').eq("Tester changed");
                    res.body.should.have.property('completed').eq(true);
                    done();
                });
        });


        it("Dado que se pasa el id del usuario por parametro y no esiste entonces se debe actualizar", (done) => {
            const userId = 6;
            const user = {
                name: "Tester changed",
                completed: true
            };
            chai.request(server)
                .put("/" + userId)
                .send(user)
                .end((error, res) => {
                    res.should.have.status(404);
                    res.text.should.eq("El usuario no existe");
                    done();
                });
        });
    });

    /**
     * Test DELETE
     */

    describe("Delete user /:id", () => {
        it("Dado que se pasa el id del usuario por parametro y esiste entonces se debe eliminar", (done) => {
            const userId = 1;
            chai.request(server)
                .delete("/" + userId)
                .end((error, res) => {
                    res.should.have.status(200);
                    done();
                });
        });


        it("Dado que se pasa el id del usuario por parametro y no esiste entonces retorna mensaje de error", (done) => {
            const userId = 8;
            chai.request(server)
                .delete("/" + userId)
                .end((error, res) => {
                    res.should.have.status(404);
                    res.text.should.eq("El usuario no existe")
                    done();
                });
        });
    });
});


