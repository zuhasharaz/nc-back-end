## Northcoders News API

### Introduction

This is a repository which contains a guide to a RESTFUL Api for a website called NC News which contains 
many articles of different topics which have been created by different users.
This site allows the users to add comments to the articles and also delete comments. 
Another great thing about this site,is that the users can upvote and downvote on comments and articles.


### Prerequisites

NC News was built using the following, so make sure that you have them installed:

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/)

### APi

If you would like to see how the site and endpoints look, you can try it on Heroku here:

* [NC News](https://ncnewsapi.herokuapp.com/)

The Databse for this site is hosted on MLab which you can check out here:

* [Mlab](https://mlab.com/databases/northcodersnews#collections)

### Getting started and Installation

To get started, please clone this repository.

1. Enter the following command in your terminal

```http
https://github.com/zuhasharaz/BE-FT-northcoders-news.git
```

2. Change into the BE-FT-northcoders-news directory

```http
 cd BE-FT-northcoders-news
```

3. To install all of the dependencies in this file, enter the following command:
```http
npm install
```

### Running the tests

1. Firstly, to run the tests in the enivronment locally, you will need to have MONGOD running.
This will run as background process and can be done in a seperate shell.

 Enter the following in your termial to run MONGOD in the background.

```http
mongod
```

2. Then we need to seed our devleopment database.

In a new terminal window enter the following command:
```http
npm run seed:dev
```

3. We then need to run the server on our local machine, this will allow the API to be accessed
through Port 9090. Nodemon will automatically start the sever if you have and saved changed in the code.

```http 
npm run dev
```

4. You can now access the local api in your browser.
Enter the following in your browser

```http
http://localhost:9090/api
```

You can see if this is working by typing

```http

http://localhost:9090/topics
```
This should return you an array of topics.


5. In order to test that all our end points are working, enter the following command:
```http
npm run test
```

### Routes


Your server should have the following end-points:
```http
GET /api
```
Serves an HTML page with documentation for all the available endpoints


```http
GET /api/topics
```

Get all the topics

```http
GET /api/topics/:topic_slug/articles
```

Return all the articles for a certain topic

```http
POST /api/topics/:topic_slug/articles
```

Add a new article to a topic. This route requires a JSON body with title and body key value pairs
e.g: `{ "title": "new article", "body": "This is my new article content"}`

```http
GET /api/articles
```

Returns all the articles

```http
GET /api/articles/:article_id
```

Get an individual article

```http
GET /api/articles/:article_id/comments
```

Get all the comments for a individual article

```http
POST /api/articles/:article_id/comments
```

Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: `{"comment": "This is my new comment"}`

```http
PUT /api/articles/:article_id
```

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: `/api/articles/:article_id?vote=up`

```http
PUT /api/comments/:comment_id
```

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: `/api/comments/:comment_id?vote=down`

```http
DELETE /api/comments/:comment_id
```

Deletes a comment

```http
GET /api/users/:username
```

### Built with

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/)

### Authors
Zuha Sharaz

