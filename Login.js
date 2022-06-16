import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";


const sendText = async (phoneNumber) => {

  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/469-744-4698
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
  method: 'POST',
  headers: {
      'Content-Type': 'application/text'
  }
  });
  console.log("PhoneNumber: ",phoneNumber);
}

const Login = () => {
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
      onPress={()=>{sendText(phoneNumber)}}
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