import React from 'react';
import PropTypes from 'prop-types'
import '../styles/ReviewItem.css';

class ReviewItem extends React.Component {

  constructor(props){
    super(props);


  }

  render() {

    let userData = this.props.data.map(function (data, index) {
        return (
          <div className="medium-12 columns" key={index}>

            <div className="people-you-might-know">

              <div className="row add-people-section">
                <div className="small-12 medium-10 columns about-people">

                  <div className="about-people-author">
                    <p className="author-name">
                      <b>{data.value}</b>
                    </p>
                    <p>{data.body}</p>
                  </div>
                </div>

              </div>


            </div>

          </div>

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
