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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ModalSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    setVisible = (visible) => {
        this.setState({visible: visible});
    }
    render() {
        return (
            <Modal visible={this.state.visible} transparent={true} onRequestClose={()=>{console.log('Close')}}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)'
                }}>
                    <View style={{
                        backgroundColor: '#2b90f5',
                        paddingVertical: 20
                    }}>
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
                        <TextInput onChangeText={(text) => {
                            this.passsword = text;
                        }} secureTextEntry={true} placeholder="Repasssword" placeholderTextColor="#ffffff" underlineColorAndroid="#ffffff" style={styles.passsword}/>
                        <TouchableOpacity onPress={this.login} style={styles.login} activeOpacity={0.7}>
                            <Text style={{
                                color: '#ffffff',
                                fontWeight: 'bold'
                            }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text onPress={() => {
                    this.setVisible(false)
                }} style={styles.dimiss}>
                    X
                </Text>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    dimiss: {
        position: 'absolute',
        color: '#ffffff',
        top: 0,
        right: 0,
        fontWeight: 'bold',
        fontSize: 20,
        padding:10
    },
    username: {
        color: '#ffffff',
        padding: 10
    },
    passsword: {
        color: '#ffffff',
        padding: 10
    },
    login: {
        backgroundColor: '#051575',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogo: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 45
    }
});
export default ModalSignUp;
