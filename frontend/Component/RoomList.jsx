import React from 'react';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import Store from './Store.jsx';
class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: Store.getListRoom()
        }
        Store.on('changeRoom', () => {
            this.setState({
                rooms: Store.getListRoom()
            });
        });
        socket.on('changeMemberOfRoom', (data) => {
            // do something
        });
    }
    onItemClick(item, e){
        console.log(item)
        Store.emit('add', {name: item, type: 'room'});
        Store.emit('resetNotifyMessageRoom', {_id: item});
    }
    render() {
        return (
            <div className='rooms'>
                <ul className='list-group'>
                    {this
                        .state
                        .rooms
                        .map((room, i) => {
                            let boundItemClick = this
                                .onItemClick
                                .bind(this, room._id);
                            return (
                                  <li className='list-group-item' onClick={boundItemClick} key={i}>
                                        {room.name}{room.haveMessage
                                            ? (
                                                <span className='badge'>{room.haveMessage}</span>
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
export default RoomList;
