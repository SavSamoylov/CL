import React from 'react';
import {PostsAPI} from '../api'

class PostPage extends React.Component {
  constructor(){
    super();

    this.state = {
      postId:"",
      postTitle:"",
      postZip:"",
      postBody:"",
      postPrice:"",
      postAuthorId:"",
      postCreatedAt:"",
      postAddress:"",
      postLocation:"",
      postPhone:"",
      postObo:false
    }
  };

  componentWillMount(){

    console.log(this.props.match.params)

    const postId = this.props.match.params.postId;

    PostsAPI.grabPostData(postId)
    .then( res => {

      console.log(this.state.postId)

      this.setState({
        postId:res.data.id,
        postTitle:res.data.name,
        postZip:res.data.zip,
        postBody:res.data.postbody,
        postPrice:res.data.price,
        postAuthorId:res.data.userId,
        postCreatedAt:res.data.createdAt,
        postAddress:res.data.address,
        postLocation:res.data.location,
        postPhone:res.data.phone,
        postObo:false
      })

      console.log(this.state.postId)

    })
    .catch(err => console.log(err));

  }

  render() {
    return (
      <div>
        <h1>PostPage</h1>
        <div>{this.state.postId}</div>
        <div>{this.state.postTitle}</div>
        <div>{this.state.postZip}</div>
        <div>{this.state.postBody}</div>
        <div>{this.state.postLocation}</div>
        <div>{this.state.postPrice}</div>
        <div>
          {(() => {
              if(!this.state.postAddress){
                return "NO ADDRESS"
              } else {
                return "HAS ADDRESS" + this.state.postAddress;
              }

          })()}
        </div>
      </div>
    )
  }
}


export default PostPage;
