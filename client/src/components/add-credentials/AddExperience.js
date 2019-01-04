import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { addExperience } from '../../actions/profileActions';


class AddExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(expData, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    render() {
        const { errors } = this.state; 

        return (
            <div className="add-experience">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <a href="/dashboard" className="btn btn-primary">
                        이전
                    </a>
                    <h1 className="display-4 text-center">경력 추가</h1>
                    <p className="lead text-center">경력을 프로필에 추가합니다.</p>
                    <small className="d-block mb-2">* 은 필수 입력항목 입니다.</small>
                    
                    <hr className="mb-5"></hr>

                    <form onSubmit={this.onSubmit}>
                    
                    <TextFieldGroup
                        placeholder="회사"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="* 근무하신 회사의 이름을 입력해주세요."
                    />

                    <TextFieldGroup
                        placeholder="직책"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                        info="* 회사에서 근무한 직책을 입력해주세요."
                    />

                    <TextFieldGroup
                        placeholder="위치"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="회사의 위치를 입력해주세요."
                    />

                    <hr className="mt-5 mb-5"></hr>

                    <h6>시작일</h6>
                    <TextFieldGroup
                        placeholder="시작일"
                        name="from"
                        type="date"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={errors.from}
                        info="* 근무 시작일을 입력해주세요."
                    />

                    <h6>종료일</h6>
                    <TextFieldGroup
                        placeholder="종료일"
                        name="to"
                        type="date"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        info="* 근무 종료일을 입력해주세요."
                        disabled={this.state.disabled ? 'disabled': ''}
                    />

                    <div className="form-check mb-4">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        name="current"
                        value={this.state.current}
                        checked={this.state.current}
                        onChange={this.onCheck}
                        id="current"
                        />
                        <label htmlFor="current" className="form-check-label">
                            현재 근무 중입니다.
                        </label>
                    </div>

                    <hr className="mt-5 mb-5"></hr>

                    <TextAreaFieldGroup
                    placeholder="근무 사항"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="어떤 일을 하셨는지 입력해주세요."
                    />

                    <input type="submit" value="경력 추가" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
        )
  }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));