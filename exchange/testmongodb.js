const mongoose = require('mongoose');
const config = require('./config/database.json')
const db = mongoose.connection
const crypto = require('crypto')

async function saveOrderLog(accessKey, message){
    try{
        let order = {
            _id : message.uuid,
            accessKey : accessKey,
            uuid : message.uuid,
            side : message.side,
            ord_type : message.ord_type, 
            price : message.price, 
            avg_price : message.avg_price, 
            state : message.state,
            market : message.market,
            created_at : message.created_at,
            volume : message.volume, 
            remaining_volume : message.remaining_volume, 
            reserved_fee : message.reserved_fee, 
            remaining_fee : message.remaining_fee,
            paid_fee : message.paid_fee,
            locked : message.locked,
            executed_volume : message.executed_volume, 
            trades_count : message.trades_count 
        }
        var instance = new orderModel(order);
        let ret = await instance.save()
        return ret;
    }catch(E){  
        console.log(E)
        saveErrorLog(accessKey, E)
    }
}
const orderSchema = new mongoose.Schema(orderStructure);
const orderModel = mongoose.model('orderModel', orderSchema);