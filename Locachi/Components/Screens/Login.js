import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
import ModalSignUp from './Login/ModalSignUp.js';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.username = '';
        this.passsword = '';
    }
    login = async(events) => {
        this.props.navigator.push({name: 'home'});
        return;
        let username = this.username;
        let passsword = this.passsword;
        try {
            console.log('Try login width', username, passsword);
            let result = await fetch('http://192.168.0.116:3000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: passsword})
            });
            let data = await result.json();
            console.log('Result login', data);
            if (data.status === 100) {
                console.log('Login successfull!');
                console.log('run home')
                this.props.navigator.replace({name: 'home'});
                return;
            }
            console.log('Login failure!');
        } catch (e) {
            console.log(e);
        }
    }
    signUp = () => {
        this.refs.signup.setVisible(true);
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.logo}>
                        <Text style={styles.textLogo}>
                            Locachi
                        </Text>
                    </View>
                    <TextInput onChangeText={(text) => {
                        this.username = text;
                    }} keyboardType="email-address" placeholder="Username" placeholderTextColor="#ffffff" underlineColorAndroid="#ffffff" style={styles.username}/>
                    <TextInput onChangeText={(text) => {
                        this.passsword = text;
                    }} secureTextEntry={true} placeholder="Passsword" placeholderTextColor="#ffffff" underlineColorAndroid="#ffffff" style={styles.passsword}/>
                    <Text style={styles.textForgetpassword}>Forget password?</Text>
                    <TouchableOpacity onPress={this.login} style={styles.login} activeOpacity={0.7}>
                        <Text style={{
                            color: '#ffffff',
                            fontWeight: 'bold'
                        }}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{
                        color: '#ffffff',
                        alignSelf: 'center',
                        marginTop: 10
                    }}>Don't have account?
                        <Text onPress={this.signUp} style={{
                            fontSize: 17,
                            fontWeight: 'bold'
                        }}>
                            Sign up</Text>
                    </Text>
                </View>
                <ModalSignUp ref='signup'/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2b90f5',
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogo: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 45
    },
    username: {
        color: '#ffffff',
        padding: 10
    },
    passsword: {
        color: '#ffffff',
        padding: 10
    },
    textForgetpassword: {
        alignSelf: 'flex-end',
        color: '#ffffff',
        padding: 5
    },
    login: {
        backgroundColor: '#051575',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
});
export default Login;
