const mongoose = require("mongoose");

const { mongo } = require("./config");

class Database {
    constructor() {
        if (!Database.instance) {
            this.db = mongo.mongoURI;
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect() {
        return new Promise((resolve, reject) => {
            mongoose
                .connect(this.db, { useNewUrlParser: true })
                .then(() => {
                    console.log("Database connection established")
                    resolve()
                })
                .catch(reject);
        });
    }
}

module.exports = { Database: new Database() }