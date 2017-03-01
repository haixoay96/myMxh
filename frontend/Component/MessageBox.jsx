import React from 'react';
import ReactDom from 'react-dom';
import Store from './Store.jsx';
class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        console.log('change');
        this.state = {
            messages: []
        };
        this.onChange = this
            .onChange
            .bind(this);
        this.onKeyPress = this
            .onKeyPress
            .bind(this);
        this.dimissBox = this
            .dimissBox
            .bind(this);
        this.onScroll = this
            .onScroll
            .bind(this);
        this.changInputFile = this
            .changInputFile
            .bind(this);
        this.onClick = this
            .onClick
            .bind(this);
        this.onClickEmotion = this
            .onClickEmotion
            .bind(this);
        this.toggle = this
            .toggle
            .bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.content = '';
        socket.emit('pullListMessage', {
            name: this.props.user,
            length: 0
        }, (data) => {
            if (data.status === 100) {
                this.isScoll = 1;
                this.setState({messages: data.listChat});
            }
        });
        Store.on('receiveMessage', (data) => {
            if (data.nameSender === this.props.user) {
                var listChat = this.state.messages;
                this.isScoll = 1;
                listChat.push(data);
                this.setState({messages: listChat});
            }
        });
    }
    componentDidUpdate() {
        console.log('update' + this.props.user);
        console.log(this.isScoll);
        //listheight
        if (this.isScoll === 2) {
            ReactDom
                .findDOMNode(this.refs.list)
                .scrollTop = ReactDom
                .findDOMNode(this.refs.listheight)
                .scrollHeight + 10;
            delete this.isScoll;
            return;
        }
        if (this.isScoll === 1) {
            ReactDom
                .findDOMNode(this.refs.list)
                .scrollTop = ReactDom
                .findDOMNode(this.refs.list)
                .scrollHeight;
            delete this.isScoll;
        }

    }
    componentWillReceiveProps(next) {
        console.log(this.props.user + '1');
        console.log(next.user + '2');
        if (this.props.user !== next.user) {
            console.log('vao');
            this.setState({messages: []});
            console.log(this.state.messages.length);
            socket.emit('pullListMessage', {
                name: next.user,
                length: 0
            }, (data) => {
                if (data.status === 100) {
                    console.log(data);
                    this.setState({messages: data.listChat});
                }
            });
        }
    }
    dimissBox() {
        // $('#box').hide();
        // ReactDom.unmountComponentAtNode(document.getElementById("box"));
        // document.getElementById("box").innerHTML = "";

        Store.emit('remove', {
            name: this.props.user,
            type: 'user'
        });
    }
    onKeyPress(e) {
        if (e.charCode === 13) {
            if (this.content === '') {
                console.log('rong');
                return;
            }
            var content = this.content;
            e.target.value = '';
            socket.emit('sendMessage', {
                nameReceiver: this.props.user,
                content: content,
                type: 'text'
            }, (data) => {
                if (data.status === 101) {
                    return;
                }
                $('#send').val('');
                this.isScoll = 1;
                var listChat = this.state.messages;
                listChat.push(data.messsage);
                this.setState({messages: listChat});
                console.log(data);
            });
        }
    }
    onChange(e) {
        this.content = e.target.value;
    }
    onScroll() {
        console.log(1);
        var y = ReactDom
            .findDOMNode(this.refs.list)
            .scrollTop;
        if (y === 0) {
            console.log(2);
            socket.emit('pullListMessage', {
                name: this.props.user,
                length: this.state.messages.length
            }, (data) => {
                if (data.status === 100) {
                    this.isScoll = 2;
                    Array
                        .prototype
                        .push
                        .apply(data.listChat, this.state.messages);
                    this.setState({messages: data.listChat});
                }
            });
        }
    }
    changInputFile(e) {
        console.log(e.target.files);
        console.log(ReactDom.findDOMNode(this.refs.choose));
        let formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        $.ajax({
            url: '/post',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {
                if (data.status === 100) {
                    console.log(data);
                    socket.emit('sendMessage', {
                        nameReceiver: this.props.user,
                        content: data.content,
                        type: 'file'
                    }, (data) => {
                        if (data.status === 101) {
                            return;
                        }
                        this.isScoll = 1;
                        var listChat = this.state.messages;
                        listChat.push(data.messsage);
                        this.setState({messages: listChat});
                        console.log(data);
                    });
                }
            }
        });

    }
    onClick(e) {
        //choose
        console.log(ReactDom.findDOMNode(this.refs.choose));
        ReactDom
            .findDOMNode(this.refs.choose)
            .click();
    }
    onClickEmotion(e) {
        console.log(e.target.getAttribute("data-emotion"));
        socket.emit('sendMessage', {
            nameReceiver: this.props.user,
            content: e
                .target
                .getAttribute("data-emotion"),
            type: 'emotion'
        }, (data) => {
            if (data.status === 101) {
                return;
            }
            this.isScoll = 1;
            var listChat = this.state.messages;
            listChat.push(data.messsage);
            this.setState({messages: listChat});
            console.log(data);
        });
    }
    toggle(e) {
        let emotion = ReactDom.findDOMNode(this.refs.emotion);
        if (emotion.style.display === 'block') {
            emotion.style.display = 'none';
            return;
        }
        emotion.style.display = 'block';
    }
    getViewFromType(message) {

        switch (message.type) {
            case 'text':
                return message.content;
            case 'file':
                return (
                    <a href={message.content} target="_blank">{message.content}</a >
                );
            case 'emotion':
                return (<img
                    src={"/images/emotion/" + message.content + ".png"}
                    style={{
                    background: 'white',
                    width: '50px',
                    height: '50px'
                }}
                    alt=""/>);
            default:
                return 'Error!';
        }
    }
    onFocus(e){
         Store.emit('resetNotifyMessage', {name: this.props.user});
    }
    render() {
        return (
            <div className="box_">
                <div className="head_">
                    <span className="spanname">
                        <b>{this.props.user}</b>
                    </span>
                    <span className="fa fa-times spanremove" onClick={this.dimissBox}></span>
                    <span className="fa fa-plus spanplus"></span>
                </div>
                <div className="content_" ref='list' onScroll={this.onScroll}>
                    <div className="listmessage" ref='listheight'>
                        {this
                            .state
                            .messages
                            .map((message, i) => {
                                let date = new Date(message.dateCreate);
                                let format = (date.toLocaleString()).split(',');
                                if (message.nameSender !== Store.getName()) {
                                    if (message.type === 'emotion') {
                                        return (
                                            <div key={i}>
                                                <div className='ownmessage'>{message.nameSender}</div>
                                                <div
                                                    className="divreceive"
                                                    style={{
                                                    background: 'white'
                                                }}>
                                                    <span className="spanmessage">
                                                        {this.getViewFromType(message)}
                                                    </span>
                                                </div>
                                                <div className='datere'>{format}</div>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={i}>
                                            <div className='ownmessage'>{message.nameSender}</div>
                                            <div className="divreceive">
                                                <span className="spanmessage">
                                                    {this.getViewFromType(message)}
                                                </span>
                                            </div>
                                            <div className='datere'>{format}</div>
                                        </div>
                                    )

                                }
                                if (message.type === 'emotion') {
                                    return (
                                        <div key={i}>
                                            <div
                                                className="divsend"
                                                style={{
                                                background: 'white'
                                            }}>
                                                <span className="spanmessage">
                                                    {this.getViewFromType(message)}
                                                </span>
                                            </div>
                                            <div className='datese'>{format}</div>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={i}>
                                        <div className="divsend">
                                            <span className="spanmessage">
                                                {this.getViewFromType(message)}
                                            </span>
                                        </div>
                                        <div className='datese'>{format}</div>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                <div className="send_">
                    <input
                        type="text"
                        className='form-control inputcontentsend'
                        width='100%'
                        name=""
                        placeholder='Type a message !'
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}/>
                    <div
                        style={{
                        position: 'relative'
                    }}>
                        <span className='addsend'>
                            <i className="fa fa-smile-o fa-2" onClick={this.toggle} aria-hidden="true"></i>
                            <i className="fa fa-paperclip fa-2" aria-hidden="true" onClick={this.onClick}></i>
                            <input
                                type='file'
                                style={{
                                display: 'none'
                            }}
                                ref='choose'
                                onChange={this.changInputFile}/>
                        </span>
                        <div className="emotion" ref='emotion'>
                            <table onClick={this.onClickEmotion}>
                                <tbody>
                                    <tr>
                                        <td ><img src="/images/emotion/1.png" data-emotion='1' alt=""/></td>
                                        <td ><img src="/images/emotion/2.png" data-emotion='2' alt=""/></td>
                                        <td ><img src="/images/emotion/3.png" data-emotion='3' alt=""/></td>
                                        <td ><img src="/images/emotion/4.png" data-emotion='4' alt=""/></td>
                                        <td ><img src="/images/emotion/5.png" data-emotion='5' alt=""/></td>
                                        <td ><img src="/images/emotion/6.png" data-emotion='6' alt=""/></td>
                                    </tr>
                                    <tr>
                                        <td ><img src="/images/emotion/7.png" data-emotion='7' alt=""/></td>
                                        <td ><img src="/images/emotion/8.png" data-emotion='8' alt=""/></td>
                                        <td ><img src="/images/emotion/9.png" data-emotion='9' alt=""/></td>
                                        <td ><img src="/images/emotion/10.png" data-emotion='10' alt=""/></td>
                                        <td ><img src="/images/emotion/11.png" data-emotion='11' alt=""/></td>
                                        <td ><img src="/images/emotion/12.png" data-emotion='12' alt=""/></td>
                                    </tr>
                                    <tr>
                                        <td ><img src="/images/emotion/13.png" data-emotion='13' alt=""/></td>
                                        <td ><img src="/images/emotion/14.png" data-emotion='14' alt=""/></td>
                                        <td ><img src="/images/emotion/15.png" data-emotion='15' alt=""/></td>
                                        <td ><img src="/images/emotion/16.png" data-emotion='16' alt=""/></td>
                                        <td ><img src="/images/emotion/17.png" data-emotion='17' alt=""/></td>
                                        <td ><img src="/images/emotion/18.png" data-emotion='18' alt=""/></td>
                                    </tr>
                                    <tr>
                                        <td ><img src="/images/emotion/19.png" data-emotion='19' alt=""/></td>
                                        <td ><img src="/images/emotion/20.png" data-emotion='20' alt=""/></td>
                                        <td ><img src="/images/emotion/21.png" data-emotion='21' alt=""/></td>
                                        <td ><img src="/images/emotion/22.png" data-emotion='22' alt=""/></td>
                                        <td ><img src="/images/emotion/23.png" data-emotion='23' alt=""/></td>
                                        <td ><img src="/images/emotion/24.png" data-emotion='24' alt=""/></td>
                                    </tr>
                                    <tr>
                                        <td ><img src="/images/emotion/25.png" data-emotion='25' alt=""/></td>
                                        <td ><img src="/images/emotion/26.png" data-emotion='26' alt=""/></td>
                                        <td ><img src="/images/emotion/27.png" data-emotion='27' alt=""/></td>
                                        <td ><img src="/images/emotion/28.png" data-emotion='28' alt=""/></td>
                                        <td ><img src="/images/emotion/29.png" data-emotion='29' alt=""/></td>
                                        <td ><img src="/images/emotion/30.png" data-emotion='30' alt=""/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MessageBox;
