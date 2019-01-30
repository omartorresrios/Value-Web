import React from 'react';
import PropTypes from 'prop-types'
import '../styles/ReviewItem.css';

class ReviewItem extends React.Component {
  render() {
    return (
      <article className="ReviewItem__root">
        <div className="ReviewItem-header">
          <div className="ReviewItem-header__avatar-container">
            <img
              src={this.props.avatarUrl}
              className="ReviewItem-header__avatar-img"
              alt={`${this.props.username} profile`}
            />
          </div>
          <div className="ReviewItem-header__metadata-container">
            <strong>{this.props.username}</strong>
          </div>

        </div>
        <div className="ReviewItem__body">
          <img src={this.props.photoUrl} role="presentation" />
        </div>
        <div className="ReviewItem__footer">
          <div>
            15 Likes
          </div>
        </div>
      </article>
    );
  }
}

ReviewItem.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
};

export default ReviewItem;
