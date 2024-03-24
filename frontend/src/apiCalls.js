import { newRequest } from "./utils/newRequest";


export const loginCall = async (userCredentials, dispatch) => {
  dispatch({type: "LOGIN_START"});
  try{
    const res = await newRequest.post("auth/login", userCredentials);
    dispatch({type:"LOGIN_SUCCESS", payload: res.data});
  }catch(err){
    dispatch({type:"LOGIN_FAILURE", payload: err});
  }
};