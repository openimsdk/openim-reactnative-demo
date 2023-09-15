import { Platform } from "react-native";
import { USER_URL } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginIM } from "./openimsdk";
import { criticallyDampedSpringCalculations } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
import { BusinessUserInfo } from "../../../store/user";

export const LoginClient = async (params: { password: string; phoneNumber: any; verifyCode: string; areaCode: string; }) => {
  let platform = 1;
  if (Platform.OS === 'android') {
    platform = 2; // Android
  } else if (Platform.OS === 'ios') {
    platform = 1;
  }
  
  try {
    const url = USER_URL + "/account/login";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'operationID': '123',
      },
      body: JSON.stringify({
        ...params,
        platform: platform,
        areaCode: "+86",
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.errCode !== 0) {
        return { success: false, errorMsg: data.errDlt };
      } else {
        const { chatToken, imToken, userID } = data.data;
        try {
          // Set key-value pairs
          await AsyncStorage.setItem('chatToken', chatToken);
          await AsyncStorage.setItem('imToken', imToken);
          await AsyncStorage.setItem('userID', userID);
          const result = await LoginIM()
          if(result.success)
            return { success: true, errorMsg: "" };
          else
            return {success:false,errorMsg:result.errorMsg};

        } catch (error) {
          return { success: false, errorMsg: "Local storage error" };
        }
      }
    } else {
      // Handle errors or non-200 responses here
      return { success: false, errorMsg: "Request failed" };
    }
  } catch (error) {
    // Handle network or other errors here
    return { success: false, errorMsg: "Network error" };
  }
};


export const SignUpClient = async (params: { nickname?: string; phoneNumber: any; password: any; verifyCode?: any; autoLogin?: boolean; }) =>  {
    
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/register";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '123',
        },
        body: JSON.stringify({
          ...params,
          user: {
            "nickname": "testname",
            "faceURL": "",
            "birth": 0,
            "gender": 1,
            "email": "",
            "account": "",
            "areaCode": "+86",
            "phoneNumber": params.phoneNumber,
            "password": params.password
          },
          platform:platform,
          areaCode: "+86",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
            return { success: false, errorMsg: data.errDlt };
        }
        else{
            const { chatToken, imToken, userID } = data.data;
            try {
            // Set key-value pairs
            await AsyncStorage.setItem('chatToken', chatToken);
            await AsyncStorage.setItem('imToken', imToken);
            await AsyncStorage.setItem('userID', userID);
                
            const result = await LoginIM()
            if(result.success)
              return { success: true, errorMsg: "" };
            else
              return {success:false,errorMsg: result.errorMsg};
            
            } catch (error) {
            console.error('Error saving chatToken, imToken, userID:', error);
            return {success:false,errorMsg: "Local storage error"};
            }
        }
      } else {
        // Handle errors or non-200 responses here
        console.error("Login failed");
        return {success:false,errorMsg: "Reuqest error"};
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
      return {success:false,errorMsg: "Network error"};
    }
}
export const SendVerifyClient = async (params: { usedFor: number; phoneNumber: any; }) => {
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/code/send";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '123',
        },
        body: JSON.stringify({
          ...params,
          platform:platform,
          areaCode: "+86",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
            return {success:false,errorMsg: data.errDlt};
        }
        else{
            return {success:true,errorMsg: ""};
        }
      } else {
        // Handle errors or non-200 responses here
        console.error("Code sent failed");
        return {success:false,errorMsg:"Request error"};
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
      return {success:false,errorMsg:"Network error"};
    }
}
export const CheckVerifyClient = async (params: { phoneNumber: any; verifyCode: string; }) => {
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/code/verify";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '121233',
        },
        body: JSON.stringify({
          ...params,
          areaCode: "+86",
        }),
      })

      
      if (response.ok) {
        const data = await response.json();
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
            return {success:false,errorMsg:data.errDlt};
        }
        else{
            return {success:true,errorMsg:""};
        }
        
      } else {
        // Handle errors or non-200 responses here
        console.error("Code verify failed");
        return {success:false,errorMsg:"Request failed"};
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
      return {success:false,errorMsg:"Network failed"};
    }
}
export const ResetPasswordClient = async (params: { phoneNumber: any; password: string; verifyCode: any; }) => {
  let platform = 1;
  if (Platform.OS === 'android') {
    platform = 2; // Android
  } else if (Platform.OS === 'ios') {
    platform = 1;
  }

  try {
    const url = USER_URL + "/account/password/reset";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'operationID': '121233',
      },
      body: JSON.stringify({
        ...params,
        areaCode: "+86",
      }),
    })

    
    if (response.ok) {
      const data = await response.json();
      if(data.errCode!=0){
          console.error('Data ', data.errDlt);
          return {success:false,errorMsg:data.errDlt};
      }
      else{
          return {success:true,errorMsg:""};
      }
      
    } else {
      // Handle errors or non-200 responses here
      console.error("Code verify failed");
      return {success:true,errorMsg:"Request failed"};
    }
  } catch (error) {
    // Handle network or other errors here
    console.error("An error occurred:", error);
    return {success:true,errorMsg:"Network error"};
  }
}

export const getBusinessUserInfo = async (userIDs: string[], isSelfInfo = false) => {
  const tk = await AsyncStorage.getItem('imToken');
  const id = await AsyncStorage.getItem('userID');
  return request.post<{ users: BusinessUserInfo[] }>(
    "/user/find/full",
    {
      id,
    },
    {
      headers: {
        operationID: '923821',
        tk,
      },
    },
  );
};

