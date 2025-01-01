import Employer_Model from "../../model/employer.js";
import User_Model from "../../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IdeaModel from "../../model/PostIdea.js";
import JobSeeker_Model from "../../model/User.js";

class User_Controller {
  static UserAccountCreation = async (req, res) => {
    //  getting the input from the frontend
    const { userType,name, address, email, phone, qualification,age, password, description } =
      req.body;
    if (
      !(name && email && phone && password && description && address)
    ) {
      res.send({ error_msg: "Please enter all the credential..." });
    } else {
      //    checking the email present in db 
      const user = await User_Model.findOne({ email });
   
      if (user) {
        res.send({ error_msg: "Email already exist" });
      } else {
        const enc_code = await bcrypt.hash(req.body.password, 10);
        const user = await User_Model.create({
            userType,
          name,
          email,
          phone,
          password: enc_code,
          qualification,
          age,
          address,
          description,
                });
        if (user) {
          res.send({ success: "Account Created Succesfully" });
        }
      }
    }
  };

  // LOGIN 
  static Login = async (req, res) => {
    try {
        // get data from user
        const { email, password } = req.body
        // check data in the db if exitst or not
        const user = await User_Model.findOne({ email })
        //   user exist gardaina vane
        if (!user) {
            res.send({ error_msg: 'Enter correct details...' })
        }
        // user exist garxa vane compare 
        else {
            const hash = await bcrypt.compare(password, user.password)
            if (!(user && hash)) {
                res.send({ error_msg: 'Enter correct details...' })
            }
            else {
                const token = jwt.sign({ userId: user._id }, process.env.secrete_key, { expiresIn: '25d' })
                user.token = token
                user.password = '****'
                res.send({ user: user, success: 'Login Successful', token })
            }
        }
    }
    catch (error) {
        res.send({ error_msg: "Something went wrong" })
    }

}

// login ends here ----->


// check login 
static checkLogin = async (req, res) => {

  const token = req.body.token

  const user1 = await JobSeeker_Model.findOne({ _id: token })
  const user2 = await Employer_Model.findOne({ _id: token })
  if (user1 || user2) {
      res.send({ isLogin: true, user: user1 || user2 })
  }
  else {
      res.send({ isLogin: false, user: user1 || user2 })
  }
}


// check login ends here ----->

  //    company details for  user detail update pag

  // updating the user detail
  static UpdateCompanyDetail = async (req, res) => {
    try {
      // getting the details from

      const { name, email, phone, address } = req.body;
      if (!(name && phone && address && email)) {
        res.send({ error_msg: "Field is empty" });
      } else if (address.length < 3) {
        res.send({ error_msg: "Enter correct Address" });
      } else if (phone.length != 10) {
        res.send({ error_msg: "Enter correct Number" });
      } else {
        const _id = req.body.token;

        // if logo present in update this runs
        if (req.file) {
          // updating the logo of the post too
          const logo = req.file.filename;
          const update = await Employer_Model.updateOne(
            { _id },
            {
              name,
              address,
              phone,
              email,
              logo,
            }
          );
          const useremail = await Employer_Model.findOne({
            _id: _id,
          });
          const owneremail = useremail.email;
          const post = await IdeaModel.updateMany(
            { owneremail },
            { logo, owneremail, name, address }
          );
          if (update) {
            res.send({ success_msg: "Updated Successfully" });
          } else {

            res.send({ error_msg: "Something went wrong" });
          }
        }

        // if notlogo present in update
        else {
          const update = await Employer_Model.updateOne(
            { _id },
            {
              name,
              address,
              phone,
              email,
            }
          );
          const useremail = await Employer_Model.findOne({
            _id: _id,
          });
          const owneremail = useremail.email;
          const post = await IdeaModel.updateMany(
            { owneremail },
            { owneremail, name, address }
          );
          if (update) {
            res.send({ success_msg: "Updated Successfully" });
          }
        }
      }
    } catch (error) {}
  };
  static CompanyDetail = async (req, res) => {
    try {
      //    getting id from frontend
      const id = req.params.id;
      const user = await Employer_Model.findOne({ _id: id });

      if (user) {
        res.send(user);
      } else {
        res.send("Error");
      }
    } catch (error) {}
  };

  //all uaser api
  static getAllUser = async (req, res) => {
    const user = await User_Model.find();
    res.send(user);
  };
  // delete alluse at a time
static deleteAllUser = async(req,res)=>{
  await User_Model.deleteMany();
       res.send("deleted")
}
  // password change for employer and jobseeker also
  static ChangePassword = async (req, res) => {
    try {
      const { oldpassword, newpassword, account } = req.body;
      // change password for employer
      if (account == "employer") {
        // checking the password in the database
        const user = await Employer_Model.findOne({ _id: req.body.token });
        const oldpasswordhash = await bcrypt.compare(
          oldpassword,
          user.password
        );
        const newpasswordhash = await bcrypt.compare(
          newpassword,
          user.password
        );
        if (newpasswordhash) {
          res.send({ error_msg: "New Password is same as old password." });
        } else if (!oldpasswordhash) {
          res.send({ error_msg: "Old Password is wrong." });
        } else {
          const enc_code = await bcrypt.hash(newpassword, 10);
          const update = await Employer_Model.updateOne(
            { _id: req.body.token },
            { password: enc_code }
          );
          if (update) {
            res.send({ success_msg: "Password is changed" });
          }
        }
      } // password change for jobseeker
      else {
        // checking the password in the database
        const jobseeker_user = await JobSeeker_Model.findOne({
          _id: req.body.token,
        });
        const oldpasswordhash = await bcrypt.compare(
          oldpassword,
          jobseeker_user.password
        );
        const newpasswordhash = await bcrypt.compare(
          newpassword,
          jobseeker_user.password
        );
        if (newpasswordhash) {
          res.send({ error_msg: "New Password is same as old password." });
        } else if (!oldpasswordhash) {
          res.send({ error_msg: "Old Password is wrong." });
        } else {
          const enc_code = await bcrypt.hash(newpassword, 10);
          const update = await JobSeeker_Model.updateOne(
            { _id: req.body.token },
            { password: enc_code }
          );
          if (update) {
            res.send({ success_msg: "Password is changed" });
          }
        }
      }
    } catch (error) {
      res.send({ error_msg: "Something Went Wrong" });
    }
  };
}

export default User_Controller;
