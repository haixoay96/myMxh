import React from 'react';
import ReactDom from 'react-dom';
import Post from './Post.jsx';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [1,2,3,4,5,5,6,7,8,2,434,34,34,234,23,423,4,23,423,4,234,23,423,4,234,23,423,4,234,23,423,4,234,23,423,4,234,23,423,423,4,234,23,423,4,234,23,423,4,234,234]
        }
    }
    render(){
        return(
            <div>
                <div>
                    <input type='text' placeholder='Mày nghĩ cái gì ? nói !' style={
                        {
                            width:'100%',
                            height:'100px'
                        }
                    }/>
                    <div>Nghĩ cái cmm</div>
                </div>
                {
                    this.state.list.map((item, index)=>{
                        return(
                            <Post/>
                        )
                    })
                }
            </div>
        )
    }
}
export default Home;