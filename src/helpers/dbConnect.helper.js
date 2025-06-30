import { connect } from "mongoose";

const dbConnect = async (link) => {
  try {
    await connect(link);
<<<<<<< HEAD
=======
    console.log("mongo database connected");
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
  } catch (error) {
    console.log(error);
  }
};

<<<<<<< HEAD
export default dbConnect;
=======
export default dbConnect;
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
