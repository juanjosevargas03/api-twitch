const pool = require('../db/database');


const getSubscriptionsHistory = (req, res) => {
    pool.query('SELECT * FROM subscriptions', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
}

const getSubscriptionHistoryById = (req, res, id) => {
    pool.query(`SELECT * FROM subscriptions WHERE subscription_id = '${id}'`, (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
}

const addSubscriptionHistory = (obj) => {
    const query = `INSERT INTO subscriptions (subscription_id,status,type,broadcaster_user_id,created_at) VALUES ('${obj.id}','${obj.status}','${obj.type}','${obj.condition.broadcaster_user_id}','${obj.created_at}');`;

    pool.query(query, (err, rows, fields) => {
        if (!err) {
            return ({
                msg: 'subscription saved',
                status: 200
            });
        } else {
            console.log(err);
        }
    });
}

const updateSubscriptionHistory = (obj, res) => {
    const query = `UPDATE subscriptions SET status='${obj.status}',type='${obj.type}',broadcaster_user_id='${obj.broadcaster_user_id}' WHERE subscription_id = '${obj.subscription_id}';`;
    pool.query(query, (err, rows, fields) => {
        if (!err) {
            res.json({
                msg: "OK",
                status: 200
            });
        } else {
            console.log(err);
        }
    });
}

const deleteSubscriptionHistoryById = (res, id) => {
    pool.query(`DELETE FROM subscriptions WHERE subscription_id = '${id}'`, (err, rows, fields) => {
        if (!err && rows.affectedRows === 1) {

            res.json({ msg: 'subscription deleted' });
        } else {
            res.json({ msg: 'Error subscription not deleted' });
            console.log(err);
        }
    });
}

module.exports = {
    getSubscriptionsHistory,
    getSubscriptionHistoryById,
    addSubscriptionHistory,
    updateSubscriptionHistory,
    deleteSubscriptionHistoryById
}