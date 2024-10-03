import { Component, ElementRef, ViewChild } from '@angular/core';

import { Map, LngLat, NavigationControl, Marker } from 'maplibre-gl';
import { environment } from '../../../../environments/environments';

const myAPIKey = environment.GEOAPIFY_KEY;

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  selector: 'markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {
    @ViewChild('map') divMap?: ElementRef;

    public markers: MarkerAndColor[] = [];

    public map?: Map;
    public zoom: number = 17;
    public currentLocation: LngLat = new LngLat(-5.844, 43.362);

    constructor(){}

    ngAfterViewInit() {
      if ( !this.divMap ) throw 'The div does\'t exist'

      const mapType = 'maptiler-3d' // osm-bright | osm-carto | klokantech-basic | osm-liberty | maptiler-3d
      const baseUrl = `https://maps.geoapify.com/v1/styles/${mapType}/style.json`;
      
      this.map = new Map({
        container: this.divMap?.nativeElement,
        style: `${baseUrl}?apiKey=${myAPIKey}`,
        center: this.currentLocation,
        zoom: this.zoom
      });

      this.readFromLocalStorage();

      // controls of the map by default
      this.map.addControl(new NavigationControl());

      // adding  a marker to the map
      // const markerHtml = document.createElement('div');
      // markerHtml.innerHTML = 'Simon';
      // const marker = new Marker({
      //   color: 'red',
      //   element: markerHtml
      // })
      //   .setLngLat( this.currentLocation )
      //   .addTo(this.map);
    }

    // function to create the marker from html
    createMarker() {
      if ( !this.map ) return;

      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const lngLat = this.map?.getCenter();
      this.addMarker(lngLat, color);
    }
    // function to add the marker to the map 
    addMarker( lngLat: LngLat, color: string ) {
        if ( !this.map ) return;
        const marker = new Marker({
          color,
          draggable: true
        })
          .setLngLat( lngLat )
          .addTo( this.map );

        // to store the marker again if it changes its position
        marker.on('dragend', (e) => this.saveToLocalStorage()) 

        // adding the marker plus its color to the array
        this.markers.push({
          color,
          marker
        });
        this.saveToLocalStorage()
    }

    deleteMarker( index: number ) {
      this.markers[index].marker.remove();
      this.markers.splice( index, 1)
    }

    // Move to a marker
    flyTo( marker: Marker ) {
      this.map?.flyTo({
        center: marker.getLngLat(),
        zoom: 18
      })
    }

    // keep the markers on storage
    saveToLocalStorage(){
      const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray()
        }
      });

      localStorage.setItem("plainMarkers", JSON.stringify(plainMarkers))
    }

    // load the markers
    readFromLocalStorage() {
      const plainMarkersString = localStorage.getItem("plainMarkers") ?? '[]'
      const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! warn
      plainMarkers.forEach( ({ color, lngLat }) => {
        const [ lng, lat ] = lngLat;
        const coords = new LngLat(lng, lat);

        this.addMarker(coords, color)
      })      
    }
}
