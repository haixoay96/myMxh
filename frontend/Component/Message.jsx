import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <li className='list-group-item'>
                {this.props.user}+ ': ' + this.props.content
            </li>
        )
    }
}
export default Message;
