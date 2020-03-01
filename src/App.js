import React from 'react';
import MyMap from './MyMap';
import List from './List';
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      initialData: null,
      data: null,
      lat: null,
      lng: null,
      id: null
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const currLat = position.coords.latitude.toString();
          const currLng = position.coords.longitude.toString();
          var requestOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer GZwAGFbMbXiNldKLln53GoRc92aTrl0ZJrxQsCBop0K0v-Cv2fKLfjz4By6NJpybxPaRjar9DwsUDhIg0xw0Qix05xOIfUrw5TQOiNTK6uNMTikAmmstWTdCiB1XXnYx',
              'Access-Control-Allow-Origin': '*'
            }
          };
          fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&latitude="+currLat+"&longitude="+currLng+"&limit=50", requestOptions)
            .then(response => response.json())
            .then(result => this.setState({initialData: result.businesses, data: result.businesses}))
            .catch(error => console.log('error', error));
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      )
    }
  }

  callBack = (business, id) => {
    this.setState({data: business});
  }

  render() {
    return (
      <div>
        {this.state.data && this.state.lat && this.state.lng ? 
          (
            <div className="col">
              <List className="list" data={this.state.data} callBack={this.callBack}/>
              <MyMap className="map" lat={this.state.lat} lng={this.state.lng} data={this.state.data}/>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default App;
