import React, { Component } from 'react'
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          {<Moment format="YYYY/MM/DD">{exp.from}</Moment>} -
          {exp.to == null ? (" 현재 근무 중") : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
        </p>

        <p><strong>직책 : </strong>{exp.title}</p>
        <p>
          {exp.location === '' ? null: (<span><strong>위치 : </strong>{exp.location}</span>)}
        </p>
        <p>
          {exp.description === '' ? null: (<span><strong>역할 : </strong>{exp.description}</span>)}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to == null ? (" 현재 근무 중") : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
        </p>

        <p><strong>학위 : </strong>{edu.degree}</p>
        <p><strong>전공 : </strong>{edu.fieldofstudy}</p>
        <p>
          {edu.description === '' ? null: (<span><strong>설명 : </strong>{edu.description}</span>)}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="text-center text-dark">
          <h3 className="mb-3">경력</h3>

            {expItems.length > 0 ? (
              <ul className="list-group">
                {expItems}
              </ul>
            ) : (
              <p className="text-center">경력이 없습니다.</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="text-center text-dark">
          <h3 className="mb-3">학력</h3>

            {eduItems.length > 0 ? (
              <ul className="list-group">
                {expItems}
              </ul>
            ) : (
              <p className="text-center">학력이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileCreds;