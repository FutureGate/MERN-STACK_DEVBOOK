import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { deletePost, addLike, removeLike } from '../../actions/postActions';

import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';


class PostItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayComment: false
        };
    }

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    onDisplayCommentClick() {
        this.setState(prevState => ({
            displayComment: !prevState.displayComment
        }));
    }

    render() {
        const { post, auth } = this.props;
        const { displayComment } = this.state;

        let commentContent;

        if(displayComment) {
            commentContent = (
                <div className="comment mt-3">
                    <CommentForm postID={post._id} />
                    <CommentFeed comments={post.comments} postID={post._id} />
                </div>
            )
        } else {
            commentContent = null;
        }

        return (
            <div className="post-item mb-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to={`/profile/id/${auth.user.id}`}>
                            <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                            </Link>
                            <br />
                            <p className="text-center">{post.name}</p>
                        </div>
                        <div className="col-md-10">
                            <p className="lead">
                            {post.text}
                            </p>
                        </div>
                    </div>

                    <div className="card-body">
                        <hr className="mb-3" />

                        <div className="text-right">
                            {post.user === auth.user.id ? (
                                <button
                                    onClick={this.onDeleteClick.bind(this, post._id)}
                                    type="button"
                                    className="btn btn-danger mr-1"
                                    >
                                    삭제
                                </button>
                            ) : null}

                            {(post.likes.filter(like => like.user.toString() === auth.user.id).length > 0) ? (
                                <button
                                onClick={this.onUnlikeClick.bind(this, post._id)}
                                type="button"
                                className="btn btn-primary mr-1"
                                >
                                    <i className="text-light fas fa-thumbs-up mr-1" />
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>
                            ) : (
                                <button
                                onClick={this.onLikeClick.bind(this, post._id)}
                                type="button"
                                className="btn btn-light mr-1"
                                >
                                    <i className="text-info fas fa-thumbs-up mr-1" />
                                    <span className="badge badge-outline-dark">{post.likes.length}</span>
                                </button>
                            )}
                            
                            <button
                                onClick={this.onDisplayCommentClick.bind(this)}
                                className="btn btn-info mr-1">
                                댓글
                                {displayComment ? (
                                    <i className="fas fa-angle-up ml-2"></i>
                                ) : (
                                    <i className="fas fa-angle-down ml-2"></i>
                                )}
                            </button>

                            {commentContent}
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

PostItem.propTypes = ({
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
