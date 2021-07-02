import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclusterer";

export default class GoogleMapContainer extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    script.async = true;
    document.body.appendChild(script);
  }

  setGoogleMapRef(map, maps) {
    this.googleMapRef = map;
    this.googleRef = maps;
    let locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
    ];
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
        lat: -31.56391,
        lng: 147.154312,
      },
      zoom: 4,
    };

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
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
