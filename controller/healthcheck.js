exports.get = async (req, res, next)=>{
    try{
        try{

        }catch(err){
            return res.status(400).json([{"Connection to ______": false}])
        }
        res.status(200).json(`Connection to api is Success.`);
    }catch(err){
        console.log(err);        
        next(err);
    }
}
exports.err = (req, res, next)=>{
    res.render('home');
}

exports.home = (req, res, next)=>{
    res.render('home');
}