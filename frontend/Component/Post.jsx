import React from 'react';
import ReactDom from 'react-dom';
class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [{
                _id: '1232134',
                contents: [{
                    type:'text',
                    content: 'Chan vai'
                }, {
                    type: 'image',
                    content:'url'
                }]
            }]
        }
    }
    render(){
        return(
            <div>
                {
                    this.state.posts.map((item , index)=>{
                        return(
                            <div>
                                <div>{item.contents[0].content}</div>
                                <div>{item.contents[1].content}</div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
export default Post;