import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';

import { environment } from '../../../../environments/environments';

const myAPIKey = environment.GEOAPIFY_KEY;

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{
    
    @Input() lngLat?: [number, number];

    @ViewChild('map') divMap?: ElementRef;

    public map?: Map;
    public zoom: number = 12;

    ngAfterViewInit(): void {

      if ( !this.divMap?.nativeElement ) throw "There is no place for the map"

      if ( !this.lngLat ) throw "Needs lng and lat"

      // map 
      const mapType = 'maptiler-3d' // osm-bright | osm-carto | klokantech-basic | osm-liberty | maptiler-3d
      const baseUrl = `https://maps.geoapify.com/v1/styles/${mapType}/style.json`;
      
      this.map = new Map({
          container: this.divMap?.nativeElement,
          style: `${baseUrl}?apiKey=${myAPIKey}`,
          center: this.lngLat,
          zoom: this.zoom,
          interactive: false
        });


      // marker
      // adding  a marker to the map
      new Marker({
        color: 'red',
      })
        .setLngLat( this.lngLat )
        .addTo(this.map);
      }   
}

