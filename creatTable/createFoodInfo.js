const createFoodInfo = async (querySQL, shopID) => {
    const sql = `CREATE TABLE IF NOT EXISTS shop_food_info (
                foodID int(11) NOT NULL AUTO_INCREMENT,
                foodName varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                categoryID int(11) NULL DEFAULT NULL,
                categoryName varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                price decimal(10, 2) NULL DEFAULT 0.00,
                unit varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                orderCount int(255) NULL DEFAULT 0,
                imgUrl varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                description varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                shopID int(11) NOT NULL,
                PRIMARY KEY (foodID) USING BTREE
            ) ENGINE = InnoDB AUTO_INCREMENT = 10000 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;`
    await querySQL(sql)
}
module.exports = createFoodInfo