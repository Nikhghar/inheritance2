const { genSalt } = require("bcrypt");
const { Pool } = require("pg");
const pool = require("../db")
const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwtGenerator =  require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//registering

router.post("/register",validInfo, async(req,res) =>{
    try {
        const {name,email,password} = req.body;
        const user = await pool.query("SELECT * FROM hostelites WHERE h_email = $1",[
            email
        ]);
        if(user.rows.length !==0){
            return res.status(401).send("User already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);

        const newUser = await pool.query("INSERT INTO hostelites (h_name,h_email,h_password) VALUES($1,$2,$3) RETURNING *",
            [name,email,bcryptPassword]
        );
        //res.json(newUser.rows[0]);

        const token = jwtGenerator(newUser.rows[0].h_id);
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login
router.post("/login",validInfo,async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await pool.query("SELECT * FROM hostelites WHERE h_email = $1",[
            email
        ]);

        if(user.rows.length ===0){
            return res.status(401).send("Incorrect email or password");
        }

        const validPassword = bcrypt.compare(password,user.rows[0].h_password);
        if(!validPassword){
            return res.status(401).json("Incorrect email or password");
        }

        const token = jwtGenerator(user.rows[0].h_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify",authorization,async(req,res) =>{
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        
    }
})


module.exports = router;
