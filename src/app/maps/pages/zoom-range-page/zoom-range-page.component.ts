import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Map, LngLat } from 'maplibre-gl';
import { environment } from '../../../../environments/environments';

const myAPIKey = environment.GEOAPIFY_KEY;

@Component({
  selector: 'zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})

export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef

  public map?: Map;
  public zoom: number = 8;
  public currentLocation: LngLat = new LngLat(-5.84, 43.36);


  constructor(){}

  ngAfterViewInit() {
    if ( !this.divMap ) throw 'The div does\'t exist'

    const mapType = 'klokantech-basic' // osm-bright | osm-carto | klokantech-basic | osm-liberty | maptiler-3d
    const baseUrl = `https://maps.geoapify.com/v1/styles/${mapType}/style.json`;
    
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: `${baseUrl}?apiKey=${myAPIKey}`,
      center: this.currentLocation,
      zoom: this.zoom
    });

    this.mapListeners();
  }

  // for this case I can clean the full map when the component is destroyed
  // with that I am sure everything is clean
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map ) throw "Map not initialized"

    // update the zoom property with the current zoom
    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom() ;
    })

    // control the max and min zoom
    this.map.on('zoomend', (e) => {
      if (  this.map!.getZoom() > 18)
        this.map!.zoomTo(18) ;
      else if ( this.map!.getZoom() < 1)
        this.map!.zoomTo(1) 
    })

    // event to control the movement of the map
    this.map.on('moveend', () => {
      this.currentLocation = this.map!.getCenter();
    })
  }

  // events of buttons to modify the zoom
  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {
    this.map?.zoomOut();
  }
  // event of the range bar to modify the zoom
  zoomChanged( value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom )  
  }

}
