import mongoose from "mongoose"

const connection = async (USERNAME, PASSWORD) =>{
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.vmi6l.mongodb.net`;
    try {
       await mongoose.connect(URL, {useNewUrlParser: true, serverSelectionTimeoutMS: 5000})
       console.log("database connect successfully")
    } catch (error) {
        console.log("Error in connection:", error)
    }
}
export default connection;