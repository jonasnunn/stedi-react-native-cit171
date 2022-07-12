import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";


const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ",phoneNumber);

  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/469-744-4698
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
  method: 'POST',
  headers: {
      'Content-Type': 'application/text'
  }
  });
  const loginResponseText = await loginResponse.text();//converts the promise to a string using await
  console.log("PhoneNumber: ",phoneNumber);
}

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn, setEmailAddress}) =>{
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
  method: 'POST',
  body:JSON.stringify({oneTimePassword, phoneNumber}),
  headers: {
      'content-Type': 'application/json'
    }
  });

  const responseCode = tokenResponse.status;//200 means logged in succesfully
  console.log("Response Status Code", responseCode)
  if(responseCode==200){
    setUserLoggedIn(true);
  
    const tokenResonseString = await tokenResponse.text();
    console.log(tokenResonseString);

    const emailResponse = await fetch('https://dev.stedi.me/validate/'+tokenResonseString,);
    const emailResponseString = await emailResponse.text();
    console.log("email text:" ,emailResponseString)
    setEmailAddress(emailResponseString);
  }
  
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      /> 
      
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{getToken({phoneNumber, oneTimePassword, phoneNumber, setUserLoggedIn:props.setUserLoggedIn, setEmailAddress:props.setEmailAddress})}}
      >
        <Text>Login</Text>
      </TouchableOpacity> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
      marginTop:100
    },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
    }
});

export default Login;