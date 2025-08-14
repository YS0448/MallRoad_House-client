import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import '../../../assets/styles/components/Profile/Profile.css';
import user_avtar from '../../../assets/media/image/user_avatar3.gif';
  const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img src={user_avtar} alt="" />
          
          {/* <FaUserCircle size={100} color="#ccc" /> */}
        </div>
        <h2 className="profile-name">{user?.full_name || 'Your Name'}</h2>
        <p className="profile-email">{user?.email}</p>
        <p className="profile-role fw-bold">{user?.role || 'guest'}</p>

        {/* <button className="edit-button">Edit Profile</button> */}
      </div>
    </div>
  );
};

export default Profile;
