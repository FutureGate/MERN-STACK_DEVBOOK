import React, { Component } from 'react'
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';

class CommentFeed extends Component {
    render() {
        const { comments, postID } = this.props;

        let container;

        const feedContent = comments.map(comment =>
            <CommentItem key={comment._id} comment={comment} postID={postID} />
        );

        if(comments.length > 0) {
            container = (
                <div className="card mt-3">
                    <ul className="list-group list-group-flush">
                        {feedContent}
                    </ul>
                </div>  
            );
        }

        return (
            <div>
                {container}
            </div>
        );
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postID: PropTypes.string.isRequired
};

export default CommentFeed;