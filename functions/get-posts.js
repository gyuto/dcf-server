'use strict'

const mongodb = require('mongodb')

try {
    require('dotenv').config()
} catch (error) {
    console.warn('unable to load .env')
}
const functions = require('firebase-functions')
const databaseUrl = functions.config().mongodb.url
const ObjectID = require('mongodb').ObjectID

exports.getLatestPosts = functions.https.onRequest(async (req, res) => {
    const mongoClient = await mongodb.MongoClient.connect(databaseUrl)
    const docs = await mongoClient
        .db('dcf')
        .collection('posts')
        .find()
        .toArray()
    res.send(JSON.stringify(docs))
})

exports.getPost = functions.https.onRequest(async (req, res) => {
    const mongoClient = await mongodb.MongoClient.connect(databaseUrl)
    const postId = req.params && String(req.params[0]).slice(1)
    const doc = await mongoClient
        .db('dcf')
        .collection('posts')
        .findOne({
            _id: ObjectID(postId),
        })
    res.send(JSON.stringify(doc))
})
