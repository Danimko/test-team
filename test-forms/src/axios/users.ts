import { UserModel } from "../types/User";
import axios from "axios";

let source: axios.CancelTokenSource;

export const fetchUserData = async (userData: UserModel) => {
  if (source) {
    source.cancel();
  }
  source = axios.CancelToken.source();

  const data = await axios
    .post<UserModel>("/api/users/get-by-data", userData, {
      cancelToken: source.token,
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("отмена реквеста", error.message);
      } else {
        console.log(error);
      }
    });
  return data?.data;
};
