import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Navigator,
    Dimensions
} from 'react-native';
var width = Dimensions
    .get('window')
    .width;
var height = Dimensions
    .get('window')
    .height;
class Login extends Component {
    constructor(props) {
        super(props);
    }
    login = async(e) => {
        try {
            let result = await fetch('http://192.168.1.27:3000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.username, password: this.password})
            });
            let data = await result.json();
            console.log(data);
            if (data.status === 100) {
                console.log('go to home');
                this
                    .props
                    .navigator
                    .push({name: 'home'});
            }
        } catch (exception) {
            console.log(exception);
        }

    }
    render() {
        console.log('Render!');
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    onChangeText={(text) => {
                    this.username = text;
                }}
                    placeholder='Username'
                    placeholderTextColor='#ffffff'
                    style={styles.input}/>
                <Text style={styles.text}>Password</Text>
                <TextInput
                    onChangeText={(text) => {
                    this.password = text;
                }}
                    placeholder='Password'
                    placeholderTextColor='#ffffff'
                    style={styles.input}/>
                <Button title='Đăng nhập' onPress={this.login} style={styles.button}/>
                <View style={styles.more} >
                    <Text style={{
                        marginTop:10,
                        marginRight:5
                    }}>
                        Đăng ký
                    </Text>
                    <Text style={{
                        marginLeft:5,
                        marginTop:10
                    }}>
                        Quên mật khẩu?
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#10C390',
        paddingTop: 100,
        paddingHorizontal: 10
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        height: 0,
        width: 0
    },
    input: {
        color: '#ffffff',
        height: 50,
        width: width - 20
    },
    button: {
        height: 50,
        color: '#ffffff',
        width: width
    },
    more:{
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
export default Login;