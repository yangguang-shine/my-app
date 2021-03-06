// this 指向 this

const randomNum = require('../../../tools/randomNum');

module.exports = async function submit() {
    const orderKey = randomNum()
    const orderTime = +new Date()
    const { shopID, orderAmount, foodList, minusPrice, businessType, reservePhone, selfTakeTime, address, takeOutTime, originOrderAmount } = this.request.body
    if (!shopID) {
        this.body = this.parameterError
        return
    }
    const userID = await this.getUserID()
    await this.SQLtransaction(async (querySQL) => {
        // 插入order_key_list
        const orderKeyValues = [orderKey, shopID, orderAmount, orderTime, minusPrice, businessType, reservePhone, selfTakeTime, address, takeOutTime, originOrderAmount, userID]
        const insertOrderKeyListSQL = `insert into order_key_list (orderKey, shopID, orderAmount, orderTime, minusPrice, businessType, reservePhone, selfTakeTime, address, takeOutTime, originOrderAmount, userID) values (?);`
        const insertOrderKeyListSQLPromist = querySQL(insertOrderKeyListSQL, [orderKeyValues])
        // 插入 order_food_list
        const foodListValues = []
        foodList.forEach((item) => {
            const foodID = item.foodID
            const orderCount = item.orderCount
            const imgUrl = item.imgUrl
            const foodName = item.foodName
            const categoryID = item.categoryID
            const categoryName = item.categoryName
            const price = item.price
            const unit = item.unit
            const description = item.description
            foodListValues.push([foodID, orderCount, imgUrl, foodName, categoryID, categoryName, price, unit, description, orderKey, shopID, userID])
        })
        // await querySQL(sql, [values])
        const insertOrderFoodListSQL = 'insert into order_food_list (foodID, orderCount, imgUrl, foodName, categoryID, categoryName, price, unit, description, orderKey, shopID, userID) values ?'
        const insertOrderFoodListSQLPromist = querySQL(insertOrderFoodListSQL, [foodListValues])

        await insertOrderKeyListSQLPromist
        await insertOrderFoodListSQLPromist
    })
    this.body = {
        code: '000',
        msg: '提交成功',
        data: orderKey
    }
}