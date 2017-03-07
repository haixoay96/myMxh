import React, {Component} from 'react'
import {AppRegistry, ListView, View, Dimensions,Text, StyleSheet,Image ,TextInput} from 'react-native'
var width = Dimensions
    .get('window')
    .width;
var height = Dimensions
    .get('window')
    .height;
// Row data (hard-coded)
const rows = {
    'Bạn bè': [
        {
            id: 0,
            text: 'Nguyễn Đức Linh'
        }, {
            id: 1,
            text: 'Nguyễn Quang Tuấn'
        }, {
            id: 2,
            text: 'Nguyễn Văn Sơn'
        }, {
            id: 4,
            text: 'Nguyễn Việt Tiến'
        }, {
            id: 5,
            text: 'Nguyễn Huy Hùng'
        }, {
            id: 6,
            text: 'Chí phèo'
        }, {
            id: 7,
            text: 'Tiểu nhị'
        }, {
            id: 8,
            text: 'Hoàng Hậu'
        }, {
            id: 9,
            text: 'Tiền tỷ'
        }
    ],
    'Nhóm': [
        {
            id: 0,
            text: 'View'
        }, {
            id: 1,
            text: 'Text'
        }, {
            id: 2,
            text: 'Image'
        }, {
            id: 4,
            text: 'View'
        }, {
            id: 5,
            text: 'Text'
        }, {
            id: 6,
            text: 'Image'
        }, {
            id: 7,
            text: 'View'
        }, {
            id: 8,
            text: 'Text'
        }, {
            id: 9,
            text: 'Image'
        }
    ]
}

// Row and section comparison functions
const rowHasChanged = (r1, r2) => r1.id !== r2.id;
const sectionHeaderHasChanged = (s1, s2) => s1 !== s2;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged})

class ContentDrawerHome extends Component {

    state = {
        dataSource: ds.cloneWithRowsAndSections(rows)
    }

    renderRow = (rowData, sectionId) => {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    backgroundColor:'#343d56',
                    marginBottom:0.2,
                    padding:5
                }}>
                <Image source={require('../test.jpg')} 
                        style={{
                            width:50,
                            height:50,
                            marginRight:5
                        }}
                        resizeMode='cover'
                />
                <Text style={{
                    color:'#ffffff',
                    fontWeight:'bold'
                }}>{rowData.text}</Text>
            </View>
        )
    }

    renderSectionHeader = (sectionRows, sectionId) => {
        return (
            <Text style={styles.header}>
                {sectionId}
                ({sectionRows.length})
            </Text>
        )
    }

    render() {
        return (
            <View style={{
                height:height
            }}>
                <TextInput
                    style={{
                    color: '#ffffff',
                    width: 250,
                    paddingLeft: 10
                }}
                    underlineColorAndroid='#ffffff'
                    placeholder='Search anything !'
                    placeholderTextColor='#ffffff'/>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        padding: 15,
        backgroundColor: 'skyblue'
    },
    header: {
        padding: 15,
        backgroundColor: 'steelblue',
        color: 'white',
        fontWeight: 'bold'
    }
})

export default ContentDrawerHome;
