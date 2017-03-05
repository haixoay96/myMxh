import React, {Component} from 'react'
import {AppRegistry, ListView, View, Dimensions,Text, StyleSheet, TextInput} from 'react-native'
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
            <Text style={styles.row}>
                {rowData.text}
            </Text>
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
