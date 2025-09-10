// const userSchema = require("../Model/userSchema");
const UserRepository = require("../routers/userRepository") // impoerting this from userRepository because

//Creating a new user
exports.createUser = async (req, res) => {
  try {
    
    let users = req.body;

    console.log(users)

    //* Ensure we always have an array
    // If a single user object is sent, wrap it inside an array
    // if(!Array.isArray(users)){
    //     users = [users];
    // }

   //* Insert users into MongoDB
    const createdUser = await UserRepository.insertMany(users, {ordered: false}) //* ordered:false allows skipping duplicates

    //* Send success response
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createdUser
    })
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: "Error Creating the User",
      error: error.message
    });
  }
};

exports.getuserDetails= async (req, res) => {
  try {
    
    var getallUserDetails= await UserRepository.findMany();
      res.status(201).json({
        success: true,
        message: "User fetched successfully",
        data: getallUserDetails
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching the User",
      error: error.message
    });
  }
}

exports.updateUser = async (req,res) =>{
  try{
    console.log(req)
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: "Error updating the User",
      error: error.message
    });
  }
}

exports.deleteUser = async (req, res) =>{
  try{
    const {id} = req.query;
    var deleteUserDetails = await UserRepository.deleteById(id)
    console.log(deleteUserDetails,'test',id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleteUserDetails
    });
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: "Error deleting the User",
      error: error.message
    });
  }
}