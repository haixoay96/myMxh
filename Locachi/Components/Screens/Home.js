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
import ListViewFriend from './Home/ListViewFriend.js';
import SideMenu from 'react-native-side-menu';
import TabViewSwiper from './Home/TabViewSwiper.js';
import Icon from 'react-native-vector-icons/FontAwesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            isOpen: false
        };

    }
    setSwipe = (swipe)=>{
        this.setState({
            isOpen: swipe
        });
    }
    render(){
        return(
            <SideMenu menu={<ListViewFriend/>}  bounceBackOnOverdraw={false} onChange={(isOpen)=>{this.setSwipe(isOpen)}} disableGestures={!this.state.isOpen} isOpen={this.state.isOpen} menuPosition='right'>
                <View>
                    <View style={{
                        backgroundColor: '#051575',
                        height: 50,
                        flexDirection: 'row',
                        elevation:100
                    }}>
                    <View style={{
                            flex:1
                        }}>
                        <TextInput placeholder="Search anything" placeholderTextColor="#ffffff" underlineColorAndroid="#ffffff" style={{
                            color: '#ffffff'
                        }}/>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{this.setSwipe(true)}} style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding:5
                        }}>
                        <Icon  size={15} color='#ffffff' name='address-book'/>
                    </TouchableOpacity>

                    </View>
                    <TabViewSwiper/>
                </View>
            </SideMenu>

        )

    }
}
export default Home;
