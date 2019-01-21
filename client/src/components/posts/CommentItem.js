import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
    onDeleteClick(postID, commentID) {
        this.props.deleteComment(postID, commentID);
    }

    render() {
        const { comment, postID, auth } = this.props;

        const verticalCenterStyle = {
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '..', height: '..'
        }

        return (
            <li className="list-group-item">
                    <div className="row">
                        <div className="comment-avatar col-md-1">
                            <Link to={`/profile/id/${auth.user.id}`}>
                                        <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                            </Link>
                            <div className="text-center">
                                {comment.name}
                            </div>
                        </div>

                        <div className="comment-body col-md-10">
                            <div className="text-left">
                                {comment.text}
                            </div>
                        </div>

                        <div className="col-md-1">
                            {(comment.user === auth.user.id) ? (
                                <button className="btn btn-danger" style={verticalCenterStyle} onClick={this.onDeleteClick.bind(this, postID, comment._id)}>
                                    &times;
                                </button>
                            ) : null}
                        </div>
                    </div>
            </li>
        )
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
