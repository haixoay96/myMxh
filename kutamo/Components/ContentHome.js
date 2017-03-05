import React, {Component} from 'react';
import {View, Image, ListView, TextInput} from 'react-native';
import {NavigationBar, Lightbox, Title} from '@shoutem/ui';
import {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Item,
    Body,
    Text,
    Icon,
    Input
} from 'native-base';
import Post from './Post.js';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
console.log(Container);
console.log(Button);
const rows = [
  {id: 0, text: 'View'},
  {id: 1, text: 'Text'},
  {id: 2, text: 'Image'},
  {id: 3, text: 'ScrollView'},
  {id: 4, text: 'ListView'},
];
// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged})
var dataSource = ds.cloneWithRows(rows)

class ContentHome extends Component {
    constructor(props) {
        super(props);
    }
    renderRow(rowData){
        return(<Post/>);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <TextInput style={{
                            color: '#ffffff',
                            width:250,
                            paddingLeft:10
                        }}
                        underlineColorAndroid='#ffffff'
                        placeholder='Search anything !'
                        placeholderTextColor='#ffffff'/>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.props.openDrawer}>
                            <Icon name='contact' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <ListView dataSource={dataSource} renderRow={this.renderRow}/>
                </Content>
                <Footer >
                    <FooterTab>
                        <Button>
                            <Icon1 name='browser' color='#ffffff' size={20}/>
                        </Button>
                        <Button>
                            <Icon1 name='users' color='#ffffff' size={20}/>
                        </Button>
                        <Button >
                            <Icon2 name='earth' color='#ffffff' size={20}/>
                        </Button>
                        <Button>
                            <Icon2 name='menu' color='#ffffff' size={20}/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
export default ContentHome;