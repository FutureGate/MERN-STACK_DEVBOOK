import React, { Component } from 'react'
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { experience } = this.props;

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

    return (
      <div className="row">
        <div className="col-md-12">
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
      </div>
    )
  }
}

export default ProfileCreds;