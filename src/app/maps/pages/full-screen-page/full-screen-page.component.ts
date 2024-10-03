import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// to fix the issue importing add this line on ts-congif.json
// the error is because how it is exported export = expects import = require() 
// "compilerOptions": { // here add 
//     "allowSyntheticDefaultImports": true, // this line
import { Map, NavigationControl } from 'maplibre-gl';
import { environment } from '../../../../environments/environments';

const myAPIKey = environment.GEOAPIFY_KEY;


@Component({
  selector: 'full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  private map: Map | undefined;

  @ViewChild('map') 
  divMap?: ElementRef

  constructor(){}

  ngAfterViewInit() {

    if ( !this.divMap ) throw 'The div does\'t exist'

    console.log(this.divMap);
    
    const mapType = 'osm-liberty' // osm-bright | osm-carto | klokantech-basic | osm-liberty | maptiler-3d
    const baseUrl = `https://maps.geoapify.com/v1/styles/${mapType}/style.json`;
    const initialState = {
      lng: -5.84,
      lat: 43.36,
      zoom: 8
    };

    // const mapStyle = `${baseUrl}/${initialState.lng}/${initialState.lat}/${initialState.zoom}/style.json`;

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: `${baseUrl}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.map.addControl(new NavigationControl());

    this.map.on('error', (e) => {
      console.error('Map error:', e);
    });
  }

}
