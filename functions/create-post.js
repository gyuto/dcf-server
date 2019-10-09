'use strict'

const mongodb = require('mongodb')

try {
    require('dotenv').config()
} catch (error) {
    console.warn('unable to load .env')
}
const functions = require('firebase-functions')
const databaseUrl = functions.config().mongodb.url

exports.createPost = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).send(`You're weird!`)
    }

    const mongoClient = await mongodb.MongoClient.connect(databaseUrl)
    const doc = await mongoClient
        .db('dcf')
        .collection('posts')
        .insert({
            content: '<div>di is cool</div>',
        })

    res.send(JSON.stringify(doc))
})
