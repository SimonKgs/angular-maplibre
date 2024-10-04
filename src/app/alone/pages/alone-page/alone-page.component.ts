import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';


// this component can works by itself, it doent'n need to be imported in a module
// it is like its own module
// the only thing it needs to be an standalone component is to have the property on true
// It let the component import its dependencies as a module to use it
// eg: to use angular directives I am importing CommonModule
// to use a use a standAlone component inside another standalone like this one
// I need to import each one of the in the imports of this module, 
// otherwise they will be unknow components
@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [CommonModule, CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

  // I can inject dependencies but it must be provideInRoot or imported here from a module
  constructor(){}
}
