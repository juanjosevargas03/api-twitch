const EventSubscriptions  = require('../models/eventSubscriptions');

const saveSubscriptionInMongo = async (id) => {
    try {
        const newSub = new EventSubscriptions({
            subscription_id: id
        });

        const subSaved = await newSub.save();
    } catch (error) {
        console.log(error);
    }
};

const deleteSubscriptionInMongo = async (id) => {
    try {
        await EventSubscriptions.findOneAndDelete({ subscription_id: id });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveSubscriptionInMongo,
    deleteSubscriptionInMongo
}