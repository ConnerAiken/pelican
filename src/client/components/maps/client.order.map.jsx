import React from "react"; 

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap, 
  Marker
} = require("react-google-maps");
  
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=***REMOVED***-o&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div id="mapContainer" style={{height: '89%', minHeight: '89% !important', width: '100%'}}/>,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => 
  <GoogleMap
    ref={c => { props.onMapMounted && props.onMapMounted(c) }}
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(props.curLoc.coords.lat, props.curLoc.coords.lng)}> 
    { props.curLoc && <Marker title="Current Location" position={{ lat: props.curLoc.coords.lat, lng: props.curLoc.coords.lng}} /> }   
    {props.stores.slice(0).map(store => <Marker 
                                            onClick={props.onSelect.bind(this, store)} 
                                            value={store} 
                                            title={store.name} 
                                            id={store.id} 
                                            key={`storeMarker-${store.id}`}
                                            position={{ 
                                                        lat: parseFloat(store.lat), 
                                                        lng: parseFloat(store.lng)}
                                                    } 
                                            options={{
                                                      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARKSURBVGhD7ZpbqBVVGMePZSlZplZkEGWlpIJCVBRKmHQBtSgfFLVIvGT6UgQFWqaJhhT2YFBUXkBUzEtoL5qZWHShwgokiDAiNfXFS2ZWoJW/33QWTMPc9j6XPRvOH3541sy3ZtZas75vfWttW7rUpebVMNgHr8L90BOaUnbk3xhn4H14GgZD0yjZkTh/w1a4GSqvZEeOwjp4BK6CptFw+AjmwS3QDZpOj8EJ+Axu8kKz6XLYAPEp9RtMhabRSPgZbPxpmAObWstiB/tAZdUdFsE5sMFfwSAImgZ2zHsH4C6onG4A/cBGGlKXwkWQ1ECwg9rZ4cXgAFRChtFTYOMOwWjIkx18Ceywdb6AhgaC3uB6YGPkXegHZTUKnGLWdSAaEghGwE9gI36HmVCP+sJGCIPRaYHgQlgAZ8EX74X2SC86NRBcD5+CL3N+vwIXQ3vJQPAl+PwOCwST4FfwJYfhHugIhUAQQni7BQIdeg34UDFTvQI6Wu0aCO6AH8GHuYd4AjpTOn2bAoEO/TwEh/4GhkCjZCAwT7Mtpj6lAsF18DFY6R9YBj2g0ao5ELgya3wE7vNChWTD44HAzmRKA/2hyju3J8F2ro9KGdLAMFtlTYE2deQaMBzn6Vq45L8/c6UvFh0LmVGnLbilO2KqkNxX9wKvfx2V0tUf/oQ9USlbQ8F5vjkqpetOMNi8EZX+r0fBdq6NShkKzu5KHtdc8Lo864WEdMT3INiYj6UdMlwN34I2duYhSOoyCBHKxXAABPnM3eC9hV7I0nTQ6C9YAg+Co2Ju5YvDHuJDeBzGggdtP4DXT0KIKp4uPgPjYDIsh7AeHGv911F30fOQ4gF4AYyY3gvrmCnRbHgYPNjz2i/goOTqZdA4zh8wAyZCeFESF07PsGxQlo1sB6PiUxA6lmQXmFU7TZP3jsPtUKhwoOaoOQKvQfxo81LwQOEd2AmrYDxcAEE6stNzBeyAbeAXvg3iuhKctlvADr4O8YTUZ7oD9auFzPtzKCWnghV8eZXkVLJdTqtScrSt4JeomvRd/bTUPsgTEDuio1ZNIajcGJUK5EKj8YSoVC19ALbt7qhUoE9AY/cjVdNKsG2G60IdBI1NSWqV+/q3SjAf6pELrW0rrO8K7YKmU9Vz/O8i6YuKMJWp5yc4t7zWN6znyhHVcH9Uql3Bv96GWRl8D9qUmucJeYppXdevXLmN1NB8ph6ZTljfHV2WQubggXetMlpZ18HIlauohqujUm3y5N26Jp55GgPaFWXJaXL9cB1x85crfx7zJS9GpdoU/CM3vUbuafTDev0kfPXcXeyboJEnF7Uq+EeZc+CQptfjJ+Za1r01KmXIxE2jek4Sy/hHUFv8xGTVuiaqmfoONPKL3FsD7jesV+QfQcFP/NEn7Xl5mClb121AprL2B2Up8o+g4CdpzyiL/yUkVTqeG5q24C6urFxr0p5RluegSxVVS8t5CL+dBKpcgFIAAAAASUVORK5CYII='
                                                    }} 
                                            opacity={.25}
                                            />
                                              )}
  </GoogleMap>
);

export default MapWithADirectionsRenderer;