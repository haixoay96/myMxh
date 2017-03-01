import React from 'react';
import ReactDom from 'react-dom';
import MessageBox from './MessageBox.jsx';
import ListChatCurrent from './ListChatCurrent.jsx';
import Store from './Store.jsx';
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: Store.getListUser()
        }
        Store.on('changeUser', () => {
            this.setState({
                users: Store.getListUser()
            });
        });
    }
    onItemClick(item, e) {
        console.log(item);
        Store.emit('add', {name: item, type: 'user'});
        Store.emit('resetNotifyMessage', {name: item});
    }
    render() {
        return (
            <div className='users'>
                <ul className='list-group'>
                    {this
                        .state
                        .users
                        .map((user, i) => {
                            if (user.name === Store.getName()) {
                                return;
                            }
                            let boundItemClick = this
                                .onItemClick
                                .bind(this, user.name);
                            if (user.isOnline) {
                                return (
                                    <li className='list-group-item active' onClick={boundItemClick} key={i}>
                                        {user.name}{user.haveMessage
                                            ? (
                                                <span className='badge'>{user.haveMessage}</span>
                                            )
                                            : ''}
                                    </li>
                                );
                            }
                            return (
                                <li className='list-group-item' onClick={boundItemClick} key={i}>
                                    {user.name}{user.haveMessage
                                        ? (
                                            <span className='badge'>{user.haveMessage}</span>
                                        )
                                        : ''}
                                </li>
                            );
                        })
}
                </ul>
            </div>
        );
    }
}
console.log('load');
export default UserList;
