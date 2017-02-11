import React from 'react';
import ReactDom from 'react-dom';
import UserList from './UserList.jsx';
import RoomList from './RoomList.jsx';
import Bar from './Bar.jsx';
import ListChatCurrent from './ListChatCurrent.jsx';
import Store from './Store.jsx';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.content = '';
        this.onClick = this
            .onClick
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
    }

    onClick(e) {
        if (this.content === '') {
            return;
        }
        var name = this.content;
         ReactDom
                .findDOMNode(this.refs.nameroom).value = '';
        socket.emit('createRoom', {
            name: name
        }, (data) => {
            Store.emit('createRoom', {
                _id: data._id,
                name:name,
                listMember: [Store.getName()]
            });
        });
    }
    onChange(e) {
        this.content = e.target.value;
    }
    render() {
        return (
            <div>
                <div className='listContact'>
                    <li className='list-group-item list-group-item-info' style={{height:'5%'}}>
                        List User</li>
                    <UserList/>
                     <li className='list-group-item list-group-item-info' style={{height:'5%'}}>
                        <input type='text' placeholder='Type a room!'onChange={this.onChange} ref='nameroom'/>
                        <input type='button' value='Tạo' onClick={this.onClick}/>
                     </li>
                    <li className='list-group-item list-group-item-info' style={{height:'5%'}}>
                        List Room</li>
                    <RoomList/>
                </div>
                <div className='chat_' id='box'>
                    <ListChatCurrent/>
                </div>
            </div>
        )
    }
}
export default App;
