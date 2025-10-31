const mongoose = require('mongoose');

const FSB_Schema=  new mongoose.Schema({
    store_id:{type: String, required: [true, "Store_id is missing"], unique: true},
    freeShippingAmount: {type: Number, required: [true, "missed free shipping amount"]},
    currency: {type: String, required: [true, "Currency name is missing"], default: "USD"},
    currencySymbol: {type: String, required: [true, "currency symbol is missing"], default: "$"},
    ShippingTitle: {type: String, required: [true, "shipping title is missing"], default: "Free Shipping"},
    updatedCurrencyPosition: {type: String, required: true, default: "amount"},
    currencySymbolPosition: {type: String, required: true, default: "before amount"},               
    progressCartValue: {type: Number, required: true},
    currentCartValue: {type: Number, required: true},
    remainingAmount: {type: Number, required: true},
    isFreeShippingAchieved: {type: Boolean, required: true, default: false},
    styleBar: {
        fontFamily: {type: String, default: "Segoe UI"},
        fontSize: {type: String, default: "16px"},
        backgroundColor: {type: String, default: "#d3d3d3"},
        textColor: {type: String, default: "#000000"},
        specialTextColor: {type: String, default: "#FF0000"},
    },
    messagesBar: {
        InitialMessageBar: {type: String, required: true, default: "Add $X more to get free shipping."},
        ProgressMessageBar: {type: String, required: true, default: "Add $X more to get free shipping!"},
        GoalMessageBar: {type: String, required: true, default: "🎉 You’ve unlocked free shipping!"},
    },
    updatedAt: {type: Date, required: true, default: Date.now}        
},{timestamps: true, versionKey: false});   

const FreeShippingBarModel = mongoose.model('freeShippingBar', FSB_Schema);

module.exports = FreeShippingBarModel;

// let FreeShippingDiscount = {
//       store_id: "shopify_store_123",
//       freeShippingAmount: "",
//       currency: "USD",
//       currencySymbol: "$",
//       ShippingTitle: "my title",
//       updatedCurrencyPosition: "amount",
//       currencySymbolPosition: "before amount",
//       progressCartValue: 0,
//       currentCartValue: 400,
//       remainingAmount: 0,
//       isFreeShippingAchieved: false,
//       styleBar: {
//         fontFamily: "Segoe UI",
//         fontSize: "18px",
//         backgroundColor: "#d3d3d3",
//         textColor: "#000000",
//         specialTextColor: "#FF0000",
//       },
//       messagesBar: {
//         InitialMessageBar:
//           "Get your shopping on! Add $100 more for free shipping.",
//         ProgressMessageBar: "Add $X more to get free shipping!",
//         GoalMessageBar: "🎉 You’ve unlocked free shipping!",
//       },
//       updatedAt: new Date().toISOString(),
//     };
