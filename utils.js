const {default: axios } = require('axios');
const db = require('./db');
const email = require('./email');

// Numbers
const sum = (a, b) => a + b;

// Strings 
 const greeting = (name) => `Hello ${name}`; 

// Boleans
const isEven = (number) => (number % 2 === 0 ? true:false);

// Arrays
const ANIMALS = ['cat', 'dog', 'monkey'];

// objects
const getOrderById = (id) => {
    if(!id){
        throw new Error('id is nor defined');
    }
    return { id: 1, price: 10, date: 2022 };
}

// async code
const getOrdersAsync = async () => {
    return [
        { id: 1, price: 10 },
        { id: 2, price: 20 },
        { id: 3, price: 30 },
    ]
}

// mocks
const applyDiscount = (orderId) => {
    const order = db.getOrder(orderId);
    if (order.price >= 10) {
        order.price -= order.price * 0.1;
    };
    return order;
};

// fetchData
const fetchData = async () => {
    const data = axios.get('https://url.com');
    // operations
    return data;
};


/// real exaple
const creatOrder = async (userId, products) => {
    if (!userId){
        throw new Error('userId not found');
    }

    let totalPrice = 0;
    products.forEach((product) => (totalPrice += product.price)); 

    await db.creatOrder(userId, products);

    const user = await db.getUser(userId);
    email.sendEmail(user.email, totalPrice);

    return `oreder created successfully with totalPrice : ${totalPrice} and products ${products}`
} 


module.exports = {
    sum,
    greeting,
    isEven,
    ANIMALS,
    getOrderById,
    getOrdersAsync,
    applyDiscount,
    fetchData,
    creatOrder
};