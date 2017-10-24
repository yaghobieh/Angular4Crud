let express    = require('express');
let app        = express();
let mongoose   = require('mongoose');
let bodyParser = require("body-parser");
let path       = require('path');
let morgan     = require("morgan");
const port     = process.env.PORT || 3000;

app.use(express.static(__dirname+ '/public/dist'));

// Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Connect to DB
mongoose.connect('mongodb://localhost:27017/userApp', {useMongoClient: true});
let UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    editable: { type: Boolean, require: true } 
})

mongoose.model('User', UserSchema);
let User = mongoose.model('User');

// Morgan
app.use(morgan('dev'));

app.get("/users", (req, res, next) => {
    console.log("Server > GET '/users' ");
    User.find({}, (err, users)=>{
        return res.json(users);
    })
})

app.post("/users", (req, res, next) => {
    console.log("Server > POST '/users' > user ", req.body);
    delete req.body._id
    User.create(req.body, (err, user)=>{
        if (err) return res.json(err)
        else return res.json(user)
    })
})

// Destroy User
app.delete("/users/:id", (req, res, next) => {
    console.log("Server > DELETE '/users/:id' > id ", req.params.id);
    User.deleteOne({_id:req.params.id}, (err, rawData)=>{
        if (err) return res.json(err)
        else return res.json(true)
    })
})

app.put("/users/:id", (req, res, next) => {
    console.log("Server > PUT '/users/:id' > id ", req.params.id);
    console.log("Server > PUT '/users/:id' > user ", req.body);
    User.update({_id:req.params.id}, req.body, (err, rawData)=>{
        if (err) return res.json(err)
        else return res.json(true)
    })
    
})

app.all('*', (req, res, next)=>{
    res.sendFile(path.resolve("./public/dist/index.html"));
})

// Server
app.listen(port, () => console.log('SERVER is running... ' +port));


