import React, {Component} from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';

import PostInline from "./PostsInline";
class Posts extends Component {

    constructor(props){
        super(props);
        this.togglePostListClass = this.togglePostListClass.bind(this);
    }
    state = {
        posts: [],
        postListClass: "card",
    };

    loadPosts() {
        const endpoint = '/api/posts';
        let thisComp = this;
        let lookupOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(endpoint, lookupOptions)
            .then(function(response) {
                return response.json()
            }).then(function(responseData) {
                console.log(responseData);
                thisComp.setState({
                    posts: responseData
                });
                }).catch(function(error) {
                    console.log("error", error)
                })
    }

    createPost() {
        const endpoint = '/api/posts';
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        let data = {
            "slug": "",
            "title": "",
            "content": "",
            "draft": false,
            "publish": null,
        };
        if (csrfToken !== undefined) {
            let lookupOptions = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            };

            fetch(endpoint, lookupOptions)
                .then(function(response) {
                    return response.json()
                }).then(function(responseData) {
                    console.log(responseData);
                }).catch(function(error) {
                    console.log("error", error)
                })
        }
    }

    togglePostListClass(event) {
        event.preventDefault();
        let currentListClass = this.state.postListClass;
        if (currentListClass === "") {
            this.setState({
                postListClass: "card",
            })
        } else {
            this.setState({
                postListClass: "",
            })
        }
    }

    componentDidMount() {
        this.setState({
            posts: [],
            postListClass: "card",
        });
        this.loadPosts()
    }

    render() {
        const {posts, postListClass} = this.state;
        return (
            <div>
                <h1 className='btn btn-primary' style={{color: 'blue'}}>My Post React, Django REST App!</h1>
                <button onClick={this.togglePostListClass}>Toggle Class</button>
                {posts.length > 0 ? posts.map((postItem, index) => {
                    return (
                        <PostInline post={postItem} elClass={postListClass}/>
                    )
                }) : <p>No Posts Found</p>}
            </div>
        );
    }
}


export default Posts;
