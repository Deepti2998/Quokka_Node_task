require('dotenv/config');

const express = require('express')
const router = require('./routes')
const cors = require("cors");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3051;
const connectDB = require("./utils/connect");


const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Referer, User-Agent, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language, Pragma, Cache-Control, Expires, If-Modified-Since, Simply-Notified-Platform, Simply-Notified-Version'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    if (req.method === 'OPTIONS') {
        return res.status(204).send('OK');
    }
    next();
});
app.use(express.json());
app.get('/', (req, res) => {
    res.send("<center><p><b>Welcome to Quokka Task System!</b></p></center>");
});

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, (err) => {
            if (err) {
                console.log("Some Error Occurred", err);
            } else {
                require("./routes")(app);
                console.log(`Server is started successfully at port: ${port}`);
            }
        });
    } catch (error) {
        console.log("Failed to connect to the database, server is not running.");
        console.log(error);
    }
})();