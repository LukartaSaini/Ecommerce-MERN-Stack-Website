const express = require('express')
const app = express()
const port = 4000
const db = require('./db')
db();

const bodyParser = require('body-parser');

const cors = require('cors');                     
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST ,PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('radha radha')
})

const CreateRouter = require('./routes/CreateUser')
app.use('/user',CreateRouter)

const DisplayData = require('./routes/DisplayData')
app.use('/data',DisplayData)

const Order = require('./routes/OrderData')
app.use('/order',Order)

app.listen(port,()=>{
    console.log(`krishna app listening on port ${port}`)
})