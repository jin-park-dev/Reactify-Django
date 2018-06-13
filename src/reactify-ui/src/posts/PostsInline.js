import React, { Component } from 'react';

class PostInline extends Component {
    render() {

        const {post, elClass} = this.props;
        const showContent = elClass === 'card' ? 'd-block' : 'd-none';

        return (
            <div className={elClass}>
                <h1>Post's {post.title}</h1>
                <p className={showContent}>{post.content}</p>
            </div>
        );
    }
}

export default PostInline;
