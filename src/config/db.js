module.exports = {
    database: process.env.MYSQL_ADDON_DB || "monkey",
    username: process.env.MYSQL_ADDON_USER || "root",
    password: process.env.MYSQL_ADDON_PASSWORD || "",
    options: {
        host: process.env.MYSQL_ADDON_HOST || 'localhost',
        dialect: 'mysql'
    }
}