import React from 'react';
import ReactDom from 'react-dom';
import MessageBox from './MessageBox.jsx';
import MessageBoxGroup from './MessageBoxGroup.jsx';
import Store from './Store.jsx';
class ListChatCurrent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: Store.getAll()
        };
        Store.on('change', () => {
            this.setState({
                chats: Store.getAll()
            });
        });
    }
    render() {
        return (
            <div>
                {this
                    .state
                    .chats
                    .map((chat, i) => {
                        if(chat.type === 'user'){
                            return (<MessageBox user={chat.name} key={chat.name}/>);                            
                        }
                        return(<MessageBoxGroup room={chat.name} key={chat.name} />);
                    })
                }
            </div>
        )
    }

}
export default ListChatCurrent;
