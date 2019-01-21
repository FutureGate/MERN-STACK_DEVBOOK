import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../actions/postActions';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postID } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }

        this.props.addComment(postID, newComment);
        
        this.setState({
            text: ''
        });
    }

    render() {
        const { errors } = this.state;


        return (
            <div className="text-right">
                <button className="btn btn-dark" type="button" data-toggle="modal" data-target="#commentModal">
                댓글 작성
                <i className="fas fa-edit ml-2"></i>
                </button>

                <div className="modal fade" id="commentModal" tabIndex="1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> 

                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <TextAreaFieldGroup
                                            placeholder="내용"
                                            name="text"
                                            value={this.state.text}
                                            onChange={this.onChange}
                                            error={errors.text}
                                        />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-dismiss="modal">취소</button>
                                    <button className="btn btn-primary" onClick={this.onSubmit} data-dismiss="modal" type="submit">작성</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
  }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);