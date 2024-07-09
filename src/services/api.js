import axios from "axios";
import {
  ARCHIVE,
  CREATETODO,
  LOGIN,
  SIGNUP,
  DELETE,
  MARK,
  REMINDER,
} from "./apiConstants";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};
export const signup = async (data) => {
  return axios.post(SIGNUP, data);
};
export const createtodo = async (data) => {
  let token = getToken();
  console.log(token);
  return axios.post(CREATETODO, data, {
    headers: {
      auth: token,
    },
  });
};
export const gettodo = async () => {
  let token = getToken();
  console.log(token);
  return axios.get(CREATETODO, {
    headers: {
      auth: token,
    },
  });
};
export const gettodoarc = async (data) => {
  let token = getToken();
  console.log(token);
  return axios.put(
    CREATETODO,
    {
      todos: { _id: data._id },
      isArchive: false, // Pass the current isArchive status
    },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const addReminder = async (data) => {
  let token = getToken();
  console.log(token);
  console.log(data);
  return axios.put(REMINDER, data, {
    headers: {
      auth: token,
    },
  });
};
export const noteDelete = async (data) => {
  let token = getToken();
  return axios.post(DELETE, data, {
    headers: {
      auth: token,
    },
  });
};
export const archive = async () => {
  let token = getToken();
  console.log(token);
  return axios.get(ARCHIVE, {
    headers: {
      auth: token,
    },
  });
};
export const archiveUnarc = async (data) => {
  let token = getToken();
  return axios.put(
    ARCHIVE,
    {
      todos: { _id: data._id },
      isArchive: true, // Pass the current isArchive status
    },
    {
      headers: {
        auth: token,
      },
    }
  );
};
export const marktodoitem = async (data) => {
  let token = getToken();
  return axios.post(MARK, data, {
    headers: {
      auth: token,
    },
  });
};

export function getToken() {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
}
