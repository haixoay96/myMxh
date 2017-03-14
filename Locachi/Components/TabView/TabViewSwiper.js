import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNews from'./Tab/TabNews.js';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const heightStatusBar = StatusBar.currentHeight;
console.log(width + ' ' + height);
const Tab = (props) => {
    let listIcon = ['newspaper-o', 'user-plus', 'globe', 'bars'];
    let listColor = ['#051575', '#c9c9c9'];
    return (
        <TouchableOpacity style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }} onPress={props.onPress}>
            <Icon name={listIcon[props.index]} color={listColor[props.index === props.active
                    ? 0
                    : 1]} size={20}/>
        </TouchableOpacity>
    )
}
class TabViewSwiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
    }
    onMomentumScrollEnd = (e, state, context) => {
        console.log(state.index);
        this.setState({active: state.index});
    }
    changeTab = (index) => {
        let current = this.state.active;
        this.refs.swiper.scrollBy(index - current, true);
        console.log(index, current, index - current);
    }
    render() {
        return (
            <View>
                <View>
                    <Swiper ref='swiper' height={height - 90 - heightStatusBar} showsPagination={true} loop={false} onMomentumScrollEnd={this.onMomentumScrollEnd}>
                        <TabNews/>
                        <TabNews/>
                        <TabNews/>
                        <TabNews/>
                    </Swiper>
                </View>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    height: 50,
                    elevation: 2
                }}>
                    <Tab onPress={this.changeTab.bind(null, 0)} index={0} active={this.state.active}/>
                    <Tab onPress={this.changeTab.bind(null, 1)} index={1} active={this.state.active}/>
                    <Tab onPress={this.changeTab.bind(null, 2)} index={2} active={this.state.active}/>
                    <Tab onPress={this.changeTab.bind(null, 3)} index={3} active={this.state.active}/>
                </View>
            </View>
        )
    }
}
export default TabViewSwiper;
