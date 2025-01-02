const cors = require("cors");
const corsOptions = require("../config/corsOptions");

module.exports = cors(corsOptions);
