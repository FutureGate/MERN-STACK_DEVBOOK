import React from 'react'
import { Link } from 'react-router-dom';

const ProfileActions = (data) => {
    const handle = data.profile.profile.handle;
    
    return (
        <div className="btn-group mb-4" role="group">
                <Link to={`/profile/${handle}`} className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1"></i>
                  프로필 보기</Link>
                  
                <Link to="/edit-profile" className="btn btn-light">
                  <i className="fas fa-edit text-info mr-1"></i>
                  프로필 수정</Link>

                <Link to="/add-experience" className="btn btn-light">
                  <i className="fab fa-black-tie text-info mr-1"></i>
                  경력 추가</Link>
                  
                <Link to="/add-education" className="btn btn-light">
                  <i className="fas fa-graduation-cap text-info mr-1"></i>
                  학력 추가</Link>
        </div>
    )
}

export default ProfileActions;
