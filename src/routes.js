const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const { auth, client_id } = require('./config');
const { saveSubscriptionInMongo, deleteSubscriptionInMongo } = require('./controllers/mongoService');
const { getSubscriptionsHistory,
    getSubscriptionHistoryById,
    addSubscriptionHistory,
    updateSubscriptionHistory,
    deleteSubscriptionHistoryById } = require('./controllers/eventSubcriptions');


// EVENTSUBSCRIPTIONS LIST
router.get('/api/eventsub/subscriptions', (req, res) => {

    fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: auth,
            'Client-Id': client_id
        }
    })
        .then(res => res.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('err', err));
});

// CREATE EVENTSUBSCRIPTION
router.post('/api/eventsub/subscriptions', (req, res) => {

    fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: auth,
            'Client-Id': client_id
        }
    })
        .then(res => res.json())
        .then(data => {

            saveSubscriptionInMongo(data.data[0].id);  // SAVE SUBSCRIPTION ID IN MONGO
            addSubscriptionHistory(data.data[0]);       //  ADD SUBSCRIPTION IN MYSQL HISTORY
            res.json(data);
        })
        .catch(err => console.log('err', err));
});

// DELETE EVENTSUBSCRIPTION BY ID
router.delete('/api/eventsub/subscriptions', (req, res) => {

    fetch(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${req.body.id}`, {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: auth,
            'Client-Id': client_id
        }
    })
        .then(() => {

            deleteSubscriptionInMongo(req.body.id)   // DELETE SUBSCRIPTION ID IN MONGO
            res.json({
                msg: "OK",
                status: 200
            })
        })
        .catch(err => console.log('err', err));
});

// GET HISTORY OF ALL SUBSCRIPTIONS
router.get('/api/subscriptions/history', (req, res) => {
    try {
        getSubscriptionsHistory(req, res);
    } catch (err) {
        console.log('err', err)
    }
});

// GET SUBSCRIPTION IN HISTORY
router.get('/api/subscriptions/history/:id', (req, res) => {
    const { id } = req.params;
    try {
        getSubscriptionHistoryById(req, res, id);
    } catch (err) {
        console.log('err', err)
    }
});

// UPDATE SUBSCRIPTION IN HISTORY
router.put('/api/subscriptions/history', (req, res) => {
    try {
        updateSubscriptionHistory(req.body, res);
    } catch (err) {
        console.log('err', err)
    }
});

// DELETE SUBSCRIPTION IN HISTORY
router.delete('/api/subscriptions/history/:id', (req, res) => {
    const { id } = req.params;
    try {
        deleteSubscriptionHistoryById(res, id);
    } catch (err) {
        console.log('err', err)
    }
});

module.exports = router;