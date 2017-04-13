import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    ListView,
    Image
} from 'react-native';
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



class ListViewFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(rows)
        }
    }
    renderSectionHeader = (sectionRows, sectionId) => {
        return (
            <Text style={styles.header}>
                {sectionId}
                ({sectionRows.length})
            </Text>
        )
    }
    renderRow = (rowData, sectionId) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#343d56',
                padding: 5,
                borderColor:'#ffffff',
                borderWidth:0.3
            }}>
                <Image source={require('../../../test.jpg')} style={{
                    width: 50,
                    height: 50,
                    marginRight: 5
                }} resizeMode='cover'/>
                <Text style={{
                    color: '#ffffff',
                    fontWeight: 'bold'
                }}>{rowData.text}</Text>
            </View>
        )
    }
    render() {
        return (<ListView style={styles.container} dataSource={this.state.dataSource} renderRow={this.renderRow} renderSectionHeader={this.renderSectionHeader}/>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff'
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
export default ListViewFriend;
