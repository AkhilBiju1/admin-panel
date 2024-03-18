const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
local = "mongodb://127.0.0.1:27017/"
module.exports = {
    connect: () => {
        const url = local
        database = "database"

        mongoose.connect(url + database).then(() => console.log("connected")).catch((err) => { console.log(err); })
    }
}

