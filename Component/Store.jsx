import EventEmitter from 'events';
import async from 'async';
var listChatCurrent = [];
var listUser = [];
var listRoom = [];
var name;
window.socket = io();
socket.on('connect', () => {
    console.log('Socket connect successfull!');
});
class Store extends EventEmitter {
    constructor() {
        super();
        //login
        this.on('login', (data, fn) => {
            async.waterfall([(callback) => {
                    socket.emit('login', {
                        name: data.name
                    }, (data) => {
                        callback(null, data);
                    });
                }
            ], (error, result) => {
                if (error) {
                    return;
                }
                if (result.status === 100) {
                    name = data.name;
                    socket.emit('pullListUser', {}, (data) => {
                        console.log(data);
                        if (data.status === 100) {
                            listUser = data.listUser;
                            this.sortListUser();
                            this.emit('changeUser');
                        }
                    });
                    socket.emit('pullListRoom', {}, (data) => {
                        if (data.status === 100) {
                            console.log(data);
                            listRoom = data.listRoom;
                            this.emit('changeRoom');
                        }
                    });
                }
                fn(result);
            });
        });
        // add a box chat
        this.on('add', (data) => {
            var name = data.name;
            var index = _.findIndex(listChatCurrent, {name: name});
            if (index === -1) {
                if (listChatCurrent.length === 3) {
                    listChatCurrent.splice(0, 1);
                    listChatCurrent.unshift(data);
                    this.emit('change');
                    return;
                }
                listChatCurrent.push(data);
                this.emit('change');
                return;
            }
            var swap = listChatCurrent[0];
            listChatCurrent[0] = data;
            listChatCurrent[index] = swap;
            this.emit('change');
        });
        // remove 1 box chat
        this.on('remove', (data) => {
            var name = data.name;
            var index = _.findIndex(listChatCurrent, {name: name});
            if (index !== -1) {
                listChatCurrent.splice(index, 1);
                this.emit('change');
            }
        });
        // reset notifyMessage
        this.on('resetNotifyMessage', (data) => {
            var index = _.findIndex(listUser, {name: data.name});
            if (index !== -1) {
                delete listUser[index].haveMessage;
                this.emit('changeUser');
            }
        });
        this.on('resetNotifyMessageRoom', (data) => {
            var index = _.findIndex(listRoom, {_id: data._id});
            if (index !== -1) {
                delete listRoom[index].haveMessage;
                this.emit('changeRoom');
            }
        });
        this.on('createRoom', (data) => {
            var index = _.findIndex(listRoom, {_id: data._id});
            if (index !== -1) {
                return;
            }
            listRoom.push(data);
            this.emit('changeRoom');
        });

        // triger when change user
        socket.on('changeUser', (data) => {
            var index = _.findIndex(listUser, {name: data.name});
            if (index === -1) {
                listUser.push(data);
                this.sortListUser();
                this.emit('changeUser', listUser);
                return;
            }
            listUser[index].isOnline = data.isOnline;
            this.sortListUser();
            this.emit('changeUser');
        });
        this.on('addRoom', (data) => {
            var indexUser = _.findIndex(listUser, {
                name:data.name
            });
            if(indexUser ===-1){
                return;
            }
            var index = _.findIndex(listRoom, {_id:data.idRoom});
            if(index===-1){
                return;
            }
            var indexName = _.indexOf(listRoom[index].listMember, data.name);
            if(indexName!==-1){
                return;
            }
            socket.emit('addRoom', {
                name: data.name,
                idRoom: data.idRoom
            }, (response) => {
                if (response.status === 100) {
                    var index = _.findIndex(listRoom, {_id: data.idRoom});
                    if (index !== -1) {
                        listRoom[index]
                            .listMember
                            .push(data.name);
                        this.emit('changeMemberOfRoom');
                    }
                }
            });
        });
        // triger when change room
        socket.on('changeRoom', (data) => {
            var index = _.findIndex(listRoom, {_id: data._id});
            if (index !== -1) {
                return;
            }
            listRoom.push(data);
            this.emit('changeRoom');
        });
        socket.on('changeMemberOfRoom', (data) => {
            var index = _.findIndex(listRoom, {_id:data._id});
            if(index===-1){
                return;
            }
            var indexName = _.indexOf(listRoom[index].listMember, data.name);
            if(indexName!==-1){
                return;
            }
            listRoom[index].listMember.push(data.name);
            this.emit('changeMemberOfRoom');
        });
        // receive message
        socket.on('receiveMessage', (data) => {
            var indexChange = _.findIndex(listUser, {name: data.nameSender});
            if (indexChange === -1) {
                return;
            }
            listUser[indexChange].haveMessage = listUser[indexChange].haveMessage
                ? listUser[indexChange].haveMessage + 1
                : 1;
            this.emit('changeUser');
            this.emit('receiveMessage', data);
        });
        socket.on('receiveGroup', (data) => {
            var indexChange = _.findIndex(listRoom, {_id: data.idRoom});
            if (indexChange === -1) {
                return;
            }
            listRoom[indexChange].haveMessage = listRoom[indexChange].haveMessage
                ? listRoom[indexChange].haveMessage + 1
                : 1;
            this.emit('changeRoom', data);
            this.emit('receiveGroup', data);
        });
    }
    sortListUser() {
        let length = listUser.length;
        let online = [];
        let offline = [];
        for (let i = 0; i < length; i++) {
            if (listUser[i].isOnline) {
                online.push(listUser[i]);
                continue;
            }
            offline.push(listUser[i]);
        }
        let lengthOnline = online.length;
        for (let i = 0; i < lengthOnline - 1; i++) {
            for (let j = i + 1; j < lengthOnline; j++) {
                if (online[i].name.toLowerCase() > online[j].name.toLowerCase()) {
                    let swap = online[i];
                    online[i] = online[j];
                    online[j] = swap;
                }
            }
        }

        let lengthOffline = offline.length;
        for (let i = 0; i < lengthOffline - 1; i++) {
            for (let j = i + 1; j < lengthOffline; j++) {
                if (offline[i].name.toLowerCase() > offline[j].name.toLowerCase()) {
                    let swap = offline[i];
                    offline[i] = offline[j];
                    offline[j] = swap;
                }
            }
        }
        listUser = online.concat(offline);
    }
    // get listChatCurrent
    getAll() {
        return listChatCurrent;
    }
    // get all listUser
    getListUser() {
        return listUser;
    }
    // get all listRoom
    getListRoom() {
        return listRoom;
    }
    // get name
    getName() {
        return name;
    }
}

export default new Store();
