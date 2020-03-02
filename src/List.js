import React from 'react';
import Item from './Item';
import './List.css';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialBusinesses: this.props.data, // original data passed down from App
      businesses: [],                     // filtered data 
    }
  }

  componentDidMount() {
    this.setState({businesses: this.state.initialBusinesses});
  }

  renderList = () => {
    return this.state.businesses.map(business => {
      const {id,name,rating} = business;
      return (
          <div className="item" key={id}>
            <Item key={id} name={name} rating={rating}/>
          </div>
      );
    })
  }

  filterList = (event) => {
    // get the original list then filter it
    let updatedList = this.state.initialBusinesses;
    updatedList = updatedList.filter(business => {
      return business.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({businesses: updatedList});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState.businesses !== this.state.businesses) {
      this.props.callBack(this.state.businesses);
    }
  }

  render() {
    let listLength = this.state.businesses.length;
    return (
      <div className="list">
        <h2>{listLength} {listLength > 1 || listLength === 0 ? " results" : " result"}</h2>
        <input className="searchBar"
          type="text"
          placeholder="Search"
          onChange={this.filterList}
        />
        {this.renderList()}
      </div>
    )
  }
}
export default List;
