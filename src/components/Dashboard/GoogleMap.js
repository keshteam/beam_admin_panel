import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclusterer";
import axios from "axios"

export default class GoogleMapContainer extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    script.async = true;
    document.body.appendChild(script);
  }

  async setGoogleMapRef(map, maps) {
    this.googleMapRef = map;
    this.googleRef = maps;
    let {data} = await axios.get(
      process.env.REACT_APP_API_URL + "user/getAll"
    ); 
    let x = data.map((element)=>{
      var obj = {};
      obj.lat = element.profile.location.latitude;
      obj.lng = element.profile.location.longitude;  
      return obj;
    })
    let locations = x.filter(ele=> ele.lat !== undefined);
    let markers =
      locations &&
      locations.map((location) => {
        return new this.googleRef.Marker({ position: location });
      });
    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 10,
      minimumClusterSize: 2,
    });
  }

    static defaultProps = {
      center: {
        lat: 53.4808,
        lng: -2.2426,
      },
      zoom: 3,
    };

  render() {
    return (
      <div style={{ height: "80vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyAyXZK5sxYTIzCdsdiP75n-3mvDhmyUYDY` }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.setGoogleMapRef(map, maps)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ streetViewControl: true }}
        />
      </div>
    );
  }
}
