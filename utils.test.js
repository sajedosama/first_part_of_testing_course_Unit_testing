const {default: axios } = require('axios');
const { 
    sum,
    greeting,
    isEven,
    ANIMALS,
    getOrderById,
    getOrdersAsync,
    applyDiscount,
    fetchData,
    creatOrder,
    sendEmail
} = require('./utils');

const db = require('./db');
const email = require('./email');

test('sum - should return 2 + 3 = 5', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
    expect(result).toBeGreaterThan(4);
    expect(result).toBeGreaterThanOrEqual(5);

    expect(sum(0.102, 0.3)).toBeCloseTo(0.4);
});

test('greeting - should return Hello mahmoud', () => {
    //const res = greeting('mahmoud');
    expect(greeting('mahmoud')).toMatch('Hello mahmoud');
    expect(greeting('mahmoud')).toMatch(/Hello mahmoud/);
});

describe('isEven', ()=> {
    it('should return true for 4', () => {
        expect(isEven(4)).toBeTruthy();
    });

    it('should return false for 5', () => {
        expect(isEven(5)).toBeFalsy();
    });

    it('should return false for 7', () => {
        expect(isEven(7)).toBeFalsy();
    });

});

test('validation', () => {
    let x = 6; //defined
    let y; // undefined
    let z = null;
    expect(x).toBeDefined();
    expect(y).toBeUndefined();
    expect(z).toBeNull();
    expect(x).not.toBeNull();
    /// Null not the same of undefined (:

});

test('animals - should return true for cat', () => {
    expect(ANIMALS).toContain('cat');
});

describe ('getOrderById', () => {
    it('should return order for id = 1', ()=> {
        const res = getOrderById(1);
        expect(res).toMatchObject({ id:1, price:10 });
        expect(res).toHaveProperty('id', 1);
    });

    it('should throw error if id is not defined', ()=> {
        expect(() => getOrderById()).toThrow();
    });
});

describe ('getOrdersAsync', () => {
    it('should return some orders', async () => {
        const orders = await getOrdersAsync();
        console.log( { orders } );
        expect(orders.length).toBe(3);
        await expect(getOrdersAsync()).resolves.toContainEqual({ id: 1, price: 10 });
    });
});

describe ('applyDescount', () => {
    it('should apply discount 10% for orders price more than 10', () => {
        const myfun = jest.fn();
        myfun.mockReturnValue(5).mockReturnValueOnce(10);
        // db.getOrder = function (orderId) {
        //     return {id: orderId, price: 10};
        // };
        // const order = applyDiscount(1);
        // expect(order).toEqual({id: 1, price : 9});
    });
});

describe ('applyDescount', () => {
    it('should apply discount 10% for orders price more than 10', () => {
        db.getOrder = jest.fn().mockReturnValue({ id: 1 , price: 10});
        const order = applyDiscount(1);
        expect(order).toEqual({ id: 1, price: 9});
        //db.getOrder.mockReset();
        expect(db.getOrder.mock.calls.length).toBe(1);
        console.log(db.getOrder.mock);
    });
});

jest.mock('axios');
describe('fetchData', () => {
    it('should return some data', async () => {
        axios.get.mockResolvedValue({ id: 5});
        const data = await fetchData();
        expect(data).toEqual({ id: 5});
    });
});

describe('creatOrder', () => {
    it('should throw error if userId is not defined', async () => {
        await expect(creatOrder()).rejects.toThrow('userId not found');
    });

    it('should create order and send email', async () => {
        db.creatOrder = jest.fn();
        db.getUser = jest.fn().mockResolvedValue({ email: 'test@gmail.com'});
        email.sendEmail = jest.fn();

        const massage = await creatOrder(5, [{price: 10}, {price: 20}]);
        expect(db.creatOrder).toHaveBeenCalled();
        expect(db.creatOrder).toHaveBeenCalledWith(5, [{price: 10}, {price: 20}]);

        expect(db.getUser.mock.calls.length).toBe(1);
        expect(db.getUser.mock.calls[0][0]).toBe(5);

        expect(email.sendEmail.mock.calls.length).toBe(1);
        expect(email.sendEmail.mock.calls[0][0]).toMatch('test@gmail.com');
        expect(email.sendEmail.mock.calls[0][1]).toBe(30);
    });
});
