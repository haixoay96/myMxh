import React from 'react';
class Typeahead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: []
        };
        this.listUser = [];
        this.content = '';
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }
    onItemClick(item, e) {
        console.log(item);
        $('#input-typeahead').val(item);
    }
    onClick(e) {
        var name = $('#input-typeahead').val();
        if (name === '') {
            return;
        }
        socket.emit('addRoom', {
            name: name,
            idRoom: this.props.room
        }, (data) => {
            console.log(data);
        });
        $('#input-typeahead').val('');
    }
    onFocus(e){
        socket.emit('pullListUser', {}, (data)=>{
            console.log(data);
            if(data.status === 100){
                this.listUser = data.listUser;
            }
        });
    }
    onChange(e) {
        this.content = e.target.value;
        console.log(this.content);
        if (this.content === '') {
            this.setState({names: []});
            return;
        }
        var listNameDisplay = [];
        this.listUser.forEach((item, index) => {
            if (item.name.indexOf(this.content) !== -1) {
                listNameDisplay.push(item.name);
            }
        });
        console.log(listNameDisplay);
        this.setState({names: listNameDisplay});
    }
    render() {
        return (
            <div className='container typeahead'>
                <span className="label label-default">{this.props.room}</span>
                <div className='auto'>
                    <input className='list-group-item' id='input-typeahead' placeholder='Type a name' onFocus={this.onFocus} onChange={this.onChange}/>
                    <ul className='list-group list'>
                        {this.state.names.map((name, i) => {
                            let boundItemClick = this.onItemClick.bind(this, name);
                            return (
                                <li className='list-group-item' onClick={boundItemClick} key={i}>{name}</li>
                            )
                        })}
                    </ul>
                </div>
                <span className="label label-success" onClick={this.onClick}>Thêm</span>
            </div>
        )
    }
}
export default Typeahead;
