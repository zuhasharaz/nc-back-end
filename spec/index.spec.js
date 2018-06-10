process.env.NODE_ENV = "test";
const app = require("../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const seedDB = require("../seed/seed");
const request = require("supertest")(app);
const { topicData, userData, articleData, commentData } = require('../seed/testData/index')


describe("/northcoders-news", () => {
  let topicDocs
  let articleDocs
  let userDocs
  let commentDocs
  beforeEach(() => {
    return seedDB({topicData, userData, articleData, commentData}).then(docs => {
      [articleDocs, commentDocs, topicDocs, userDocs] = docs;
    });
  });

  describe("GET /topics", () => {
    it('returns an array of all topics and with a status 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics[0].title).to.equal('Mitch');
        });
  });
    it("GET responds with status 404 for a page not found", () => {
      return request
        .get("/api/topicsAll")
        .expect(404)
        .then(res => {
         expect(res.body).to.eql({ message: `404 - Page Not Found` });
        });
    });
  });
  
  describe("GET /topics/:topic/articles", () => {
    it("GET responds with status 200 and an object with all the articles relating to that topic", () => {
      return request
        .get(`/api/topics/${topicDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.articles[0]).to.contain.all.keys([
            "title",
            "body",
            "belongs_to",
            "votes",
            "created_by"
          ]);
        });
    });
    it("GET returns a status 404 with a message when a user enters a topic that doesnt exist", () => {
      return request
        .get("/api/topics/pandas/articles")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ message: `404 - Page Not Found` });
        });
    });
    describe("POST for topics", () => {
      it("POST returns a status 201 with the new article added", () => {
        const user_id = `${userDocs[0]._id}`
        return request
          .post("/api/topics/mitch/articles")
          .send({
            title: "This is a title",
            body: "This is the content",
            created_by: user_id
          })
          .expect(201)
          .then(res => {
            expect(res.body.created_by).to.equal(user_id);
            expect(res.body.title).to.equal("This is a title");
          });
      });
      it("POST returns a status 400 with a message when the user enters a article that doesnt exist", () => {
        return request
          .post("/api/topics/dog/articles")
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ message: ` 400 - Bad Request` });
          });
      });
    });
  });
  describe("GET /articles", () => {
    it('GET sends back status 200 and returns an array of article data', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(4);
        });
    })
    it("GET responds with status 404 for a page not found", () => {
      return request
        .get("/api/articlesAll")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ message: `404 - Page Not Found` });
        });
    });
    it("GET returns comments for an individual article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments.length).to.equal(2);
        });
     });
      it('returns a 400 with an error message for an invalid GET request', () => {
        return request
          .get('/api/articles/1235/comments')
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ message: ` 400 - Bad Request` });
          });
      });
    
    it('POST sends back status 201 and a new comment to an article', () => {
      const user_id = `${userDocs[0]._id}`;
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send({
          body: "This is the content",
          created_by: user_id
        })
        .expect(201)
        .then((res) => {
          expect(res.body.created_by).to.equal(user_id);
        });
    });
    it('returns a 400 with an error message for POST request where the text is invalid', () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send({
          text: "!"
        })
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({ message: ` 400 - Bad Request` });
        });
    });
    it('PUT sends back status 201 and increments the vote count of an article', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(201)
        .then((res) => {
          expect(res.body.votes).to.eql(1);
        })
      })
    it('PUT sends back status 201 and decrements the vote count of an article', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(201)
        .then((res) => {
          expect(res.body.votes).to.eql(-1);
        });
      })
    it('returns a 400 with an error message where the vote query is invalid', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=hello`)
        .expect(400)
        .then(res => {
        expect(res.body).to.eql({ message: ` 400 - Bad Request` });
        });
    });
  })

    describe('/users', () => {
      it("GET returns a 200 and the users", () => {
        return request
          .get("/api/users")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.users.length).to.equal(2);
          });
      });
      it("GET responds with status 404 for a page not found for page not found", () => {
        return request
          .get("/api/allusers")
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ message: `404 - Page Not Found` });
          });
      });

      it('GET returns status 200 and the profile data for a specific user', () => {
        return request
          .get(`/api/users/${userDocs[1].username}`)
          .expect(200)
          .then((res) => {
            expect(res.body.user.name).to.eql('mitch');
            expect(res.body.user.username).to.eql(
              "dedekind561"
            );
          });
      });
      it("GET returns a status 404 with a message when a user enters a user that doesnt exist", () => {
        return request
          .get("/api/topics/northcoders/articles")
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ message: `404 - Page Not Found` });
          });
      });
    })
  

  describe("GET '/comments", () => {
    it('GET returns a 200 and all the comments', () => {
      return request
        .get('/api/comments')
        .expect(200)
        .then(res => {
          expect(res.body.comments.length).to.equal(8)
          expect(res.body.comments[0]).to.have.keys("created_at", "votes", "_id", "body", "belongs_to", "created_by", "__v");
        })
      it("GET responds with status 404 for a page not found", () => {
        return request
          .get("/api/allcomments")
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ message: `404 - Page Not Found` });
          });
      });
    })
    describe("GET /comments/:comment_id", () => {
      it("GET returns a 200 and the comment when passed an existing comment id", () => {
        return request
          .get(`/api/comments/${commentDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.comment).to.have.keys('body', 'belongs_to', 'votes', 'created_at', 'created_by', '__v', '_id')
          });
      });
      it("returns a 400 with error message on invalid GET request", () => {
        return request
          .get("/api/comments/123456")
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({  message: ` 400 - Bad Request` });
          });
      });
    })

    it('DELETE sends back status 200 and removes/deletes a comment and returns a success message', () => {
      return request
        .delete(`/api/comments/${commentDocs[1]._id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.eql({
           Message: `Successfully deleted comment, id:${commentDocs[1]._id}`
          });
        });
    });
    it('returns a 400 with error message on invalid DELETE request', () => {
      return request
        .delete('/api/comments/78910')
        .expect(400)
        .then(res => {
        expect(res.body).to.eql({ message: ` 400 - Bad Request` });
        });
    });
  })
})


