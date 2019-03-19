import React from 'react';
import PropTypes from 'prop-types'
import '../styles/ReviewItem.css';
import { Link } from 'react-router-dom';
import { splitFullname } from '../Helper/Helpers';

class ReviewItem extends React.Component {

  constructor(props){
    super(props);

  }

  render() {

    let userData = this.props.data.map(function (data, index) {
        return (
          <article className="ReviewItem__root" key={index}>
            <div className="ReviewItem-header">
              <div className="ReviewItem-header__avatar-container">

              </div>
              <div className="ReviewItem-header__metadata-container">
                <div className="ReviewItem-header__username">
                  Receiver: <Link to={{pathname: `/${splitFullname(data.receiver.fullname)}`, state: { userFullnameFromHome: data.receiver.fullname, userIdFromHome: data.receiver.id, userPositionFromHome: data.receiver.position, userJobDescriptionFromHome: data.receiver.job_description }}}>{data.receiver.fullname}</Link>
                </div>
              </div>
            </div>

            <div className="ReviewItem__body">
              {data.body}
            </div>

            <div className="ReviewItem-header">
              <div className="ReviewItem-header__avatar-container">

              </div>
              <div className="ReviewItem-header__metadata-container">
                <div className="ReviewItem-header__username">
                  Sender: <Link to={{pathname: `/${splitFullname(data.sender.fullname)}`, state: { userFullnameFromHome: data.sender.fullname, userIdFromHome: data.sender.id, userPositionFromHome: data.sender.position, userJobDescriptionFromHome: data.sender.job_description }}}>{data.sender.fullname}</Link>
                </div>
              </div>
            </div>

          </article>

        )
      }, this);

      return (
        <div>
          {userData}
        </div>
      );
  }
}

export default ReviewItem;
