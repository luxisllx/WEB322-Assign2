const dashBoardLoader = (req,res)=>{

    if(req.session.userInfo.type=="Admin")
    {
        res.render("adminDashBoard");
    }
    
    else
    {
        res.render("userDashboard");
    }

}

module.exports = dashBoardLoader;