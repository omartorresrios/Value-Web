import React from 'react';
import ReviewItem from '../components/ReviewItem';

const fakeData = [
  {
    avatarUrl: 'https://secure.gravatar.com/avatar/7eb8affe35963c36f376f5f1b50d02dc',
    username: 'tommyschess',
    photoUrl: 'https://unsplash.com/photos/yRdK7ijQPNw',
  },
  {
    avatarUrl: 'https://secure.gravatar.com/avatar/7eb8affe35963c36f376f5f1b50d02dc',
    username: 'bennduchano',
    photoUrl: 'https://unsplash.com/photos/zftRK6hoYN8',
  },
]

class ReviewGroup extends React.Component {
  render() {
    return (
      <div className="ReviewGroup__root">
        {fakeData.map((item, idx) => (<ReviewItem key={idx} {...item} />))}
      </div>
    );
  }
}

export default ReviewGroup;
