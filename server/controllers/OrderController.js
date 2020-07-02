const Order = require('../models/cryptoOrder');
const User = require('../models/cryptoUser');
class OrderController {

    static readAll(req,res,next) {
        Order.find({})
            .then(orders => {
                res.status(200).json(orders)
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        Order.find({user, status: true})
            .then(orders => {
                res.status(200).json(orders)
            })
            .catch(next);
    };


    static create(req,res,next) {
        let user = req.decoded.id;
        let { pair, amount, price, order_type } = req.body;
        Order.create({pair, amount, price, user, order_type})
            .then(userOrder => {
                res.status(202).json({message: 'Order has executed'});
            })
            .catch(next)
    };

    static updateGainLoss(req,res,next) {
        console.log(req.body)
        let id = req.params.tradeId;
        let userId = req.decoded.id;
        let { gainLoss } = req.body;
        let fixBalance;
        Order.updateOne({_id: id}, {gain_loss: Number(gainLoss), status: false})
            .then(() => {
                return User.findOne({_id: userId})
            })
            .then(users => {
                let newBalance = users.demo_balance + Number(gainLoss);
                fixBalance = newBalance
                return User.updateOne({_id: userId},{demo_balance: newBalance}, {omitUndefined: true})
            })
            .then(() => {
                res.status(201).json({message: 'Your order has been close', balance: fixBalance})
            })
            .catch(next);  
    };

};

module.exports = OrderController;