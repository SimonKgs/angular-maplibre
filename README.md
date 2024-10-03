# MapsApp

This aplications will be an exercise to learn about how to manage maps using Angular, and some free sources to help me do it.

I will be trying some things like manage differents types of maps, add markers, etc...

## MAPS 

I use MapLibre, an Open-source TypeScript Library for this project to manage the maps and functions and Geoapyfy to get the templates of the maps.

[MapLibre](https://maplibre.org/)

[geopaify](https://apidocs.geoapify.com/playground/maps/)

also another library to manage maps that I used in a work previously is [Leaflet](https://leafletjs.com/) is also open source library you can test it, but for this practice, I will continue using MapLibre to learn something new.

You also can find here a good example of how to integrate Maplibre with Angular here:

[Angular+MapLibre](https://stackblitz.com/edit/angular-maplibre-map?file=src%2Fapp%2Fapp.component.ts)

## How to start

! Not use AngularCLI directly unless the environment variables are previously created, because they are created based on the .env

1. copy or clone the project to your machine
2. install dependencies
```bash
npm install
```
3. now go to the project and copy the .env.template file and rename the copy to .env
4. fill the variables with your data
5. Create envs (optional)
```bash
npm run envs
```
6. for develpment execute:
```bash
npm run start
```
7. to production execute:
```bash
npm run build
```

### Notes
To allow default imports from modules that are exported using CommonJS in TypeScript, I add the following line to the tsconfig.json file:
"allowSyntheticDefaultImports": true

I also add this configurations on Angular.json to prevent the warning of commonJS library and to add styles, both can be deleted, but will show that warning

"styles": [
    "src/styles.css",
    "node_modules/maplibre-gl/dist/maplibre-gl.css"
],
"allowedCommonJsDependencies": [
    "maplibre-gl"
]

,
