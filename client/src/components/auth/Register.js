import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors : nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
        
    }

    render() {

        const { errors } = this.state;

        return (
        <div>
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-3 text-center">시작하기</h1>
                        <p className="lead text-center">데브 북에 가입합니다</p>
                        
                        
                        <hr/>
                        <br/>
                        <form noValidate onSubmit={this.onSubmit}>

                            <h3 className="lead text-left ml-3 mb-2">이름</h3>
                            
                            <TextFieldGroup
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            />

                            <h3 className="lead text-left ml-3 mb-2">이메일</h3>

                            <TextFieldGroup
                            name="email"
                            type="email"
                            info="이 사이트는 Gravatar를 지원합니다. 아바타를 사용하시려면 Gravatar 이메일 주소를 입력하세요"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            />
                        
                            <hr className="mt-5 mb-4"></hr>

                            <TextFieldGroup
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            />
                            
                            <TextFieldGroup
                            name="password2"
                            type="password"
                            placeholder="확인 비밀번호"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                            />
                            
                            <input type="submit" value="가입하기" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));