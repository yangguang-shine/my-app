// this 指向 this

module.exports = async function orderDetail() {
    const { orderKey } = this.query
    if (!orderKey) {
        this.body = this.parameterError
        return
    }
    const userID = await this.getUserID()
    const sql1 = `select * from order_key_list where orderKey = ? and userID = ?`
    const sql2 = `select * from order_food_list where orderKey = ? and userID = ?`
    const promise1 = this.querySQL(sql1, [orderKey, userID])
    const promise2 = this.querySQL(sql2, [orderKey, userID])
    const orderInfoList = await promise1
    const foodList = await promise2
    if (!orderInfoList.length) {
        this.body = {
            code: '111',
            msg: '查询失败',
            data: {}
        }
    }
    const orderInfo = orderInfoList[0]
    orderInfo.address = JSON.parse(orderInfo.address)
    this.body = {
        code: '000',
        msg: '查询成功',
        data: {
            ...orderInfo,
            foodList
        }
    }
}