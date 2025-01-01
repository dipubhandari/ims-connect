import axios from "axios";
import { server } from "../config";

async function checkLogin() {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(`${server}/checklogin`, { token }).then((data) => {
        console.log(data.data);
            });
    } else {
     console.log("not user is logged in");
    }
  }

  export {checkLogin}