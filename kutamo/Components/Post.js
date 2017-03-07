import React, {Component} from 'react';
import {View, Image, Dimensions, ScrollView} from 'react-native';
//import {Lightbox} from '@shoutem/ui';
import Modal from 'react-native-modalbox';
import Lightbox from 'react-native-lightbox';
import {
    Container,
    Content,
    Card,
    CardItem,
    Left,
    Body,
    Text,
    Button,
    Icon,
    Right,
    Thumbnail
} from 'native-base';
var width = Dimensions
    .get('window')
    .width;
var height = Dimensions
    .get('window')
    .height;
class Post extends Component {
    constructor(props) {
        super(props);
    }
    onOpen = ()=>{

    }
    onClose = ()=>{
        
    }
    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail
                            square
                            source={{
                            uri: 'http://192.168.1.27:3000/images/logo.jpg'
                        }}/>
                        <Body>
                            <Text>Đức Linh</Text>
                            <Text note>Hà nội</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Lightbox
                        onOpen={this.onOpen}
                        onClose={this.onClose}
                    >
                        <View>
                            <ScrollView>
                                 <Image
                                    resizeMode='contain'
                                      style={{
                                    width:width,
                                    height:300
                                }}
                                source={require('../test.jpg')}/>
                            </ScrollView>
                        </View>
                    </Lightbox>
                </CardItem>
                <CardItem content>
                    <Text>What's your name? I'm Linh!</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up"/>
                            <Text>12 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button onPress={this.onPress} transparent>
                            <Icon active name="chatbubbles"/>
                            <Text>4 Comments</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text>11h ago</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}
export default Post;