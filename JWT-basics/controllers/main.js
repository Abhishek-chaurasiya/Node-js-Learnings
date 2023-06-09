
// what is the flow 
// check username, password in post (login) request
// if exist create new jwt 
// send back to front-end

// setup authentication so only the request with jwt can access the dashboard
const jwt = require('jsonwebtoken')

const login = async (req,res)=>{
    const { username, password} = req.body
    console.log(req.body)
    if(!username || !password){
        throw new CustomAPIError('Please provide email and password',400)
    }
    
    // just for demo , normally provided by DB!!
    const id = new Date().getDate()
    // try to keep payload small,better experience for user

    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(token)
    res.status(200).json({msg:'user created', token})
}

const dashboard = async (req,res)=>{
   const luckyNumber = Math.floor(Math.random()*100);

    res.status(200).json({msg:`Hello, ${req.user.username} `,secret:`Here is your authorised data, your lucky number is ${luckyNumber}`})
  
}


module.exports = {login,dashboard}
