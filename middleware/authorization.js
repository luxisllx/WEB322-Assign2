const dashBoardLoader = (req,res,next)=>{

    if(req.session.userInfo.type=="Admin")
    {
        //res.render("adminDashBoard");
        next();
    }
    
    else
    {
        res.render("userDashboard");
    }

}

module.exports = dashBoardLoader;