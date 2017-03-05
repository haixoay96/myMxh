import React, { Component} from 'react';
import {View, Dimensions} from 'react-native';
import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native';
import  ContentHome from './ContentHome.js';
import ContentDrawerHome from './ContentDrawerHome';
var width = Dimensions
    .get('window')
    .width;
var height = Dimensions
    .get('window')
    .height;
class Home extends Component{
    toggleDrawer = ()=>{
        this.refs.drawer.openDrawer();
        console.log('mo');
    }
    render(){
        return(
            <Drawer
                ref='drawer'
                drawerWidth={width-20}
                easingFunc={Easing.ease}
                customStyles={{
                    drawer: {
                        shadowColor: '#000',
                        shadowOpacity: 0.4,
                        shadowRadius: 10
                    }
                }}
                drawerContent={<ContentDrawerHome/>}
                type={Drawer.types.Default}
                drawerPosition={Drawer.positions.Right}>
                <ContentHome openDrawer={this.toggleDrawer}/>
            </Drawer>
        )

    }
}
export default Home;