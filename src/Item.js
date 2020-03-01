import React from 'react';
import './Item.css';
import StarRatings from 'react-star-ratings';

class Item extends React.Component {
  render() {
    return (
      <div className="row">
        <div>{this.props.name}</div>
        <div>
          <StarRatings className="star" 
            rating={this.props.rating}
            starDimension="20px"
            starSpacing="0px"
            starRatedColor="#00BFFF"
          />
        </div>
      </div>
    )
  }
}
export default Item
