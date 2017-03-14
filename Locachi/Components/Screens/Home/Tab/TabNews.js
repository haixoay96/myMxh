import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class TabNews extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                backgroundColor: '#ffffff',
                flex: 1}}>
                <View>
                    <View>
                        <Text>
                            What's on your mind?
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default TabNews;
