import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EsriLoaderService } from 'angular-esri-loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import { isEmpty, isEqual } from 'lodash';

import { CreateDonorDialogComponent } from '../create-donor-dialog/create-donor-dialog.component';

import { DonorService } from '../../services/donor.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges{
  @Input() userType;
  @Input() center;
  private mapView: any;
  private search: any;
  private clickEvent: any; //handle to click event listener for donor
  private moveEvent: any; //handle to map visible area watcher for patient
  private locator: any;
  private socket: any;

  //ArcGis Classes
  private Point: any;
  private Extent: any;
  private Graphic: any;
  private SimpleMarkerSymbol: any;

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(
    public donorService: DonorService,
    private dialog: MdDialog,
    private esriLoader: EsriLoaderService
  ) {
  }

  /**
   * Show the user a dialog to create pledge with coordinates set to location
   * @param location
   */
  showCreatePledgePopup(location) {
    let dialogRef = this.dialog.open(CreateDonorDialogComponent, {
      data: { location }
    });
    dialogRef.afterClosed().subscribe(donor => {
      console.log(donor);
    });
  }

  /**
   *  We monitor changes since we allow user to change the userType and center without
   *  requiring a full page reload
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    const center = changes.center;
    const userType = changes.userType;

    //check firstChange due to ngChanges being called before ngInit on initial rendering
    if(!isEmpty(center) && !isEqual(center.currentValue, center.previousValue) && !center.firstChange) {
      this.mapView.center = {
        latitude: center.currentValue.latitude,
        longitude: center.currentValue.latitude
      }
    }

    if(!isEmpty(userType) && !isEqual(userType.currentValue, userType.previousValue) && !userType.firstChange) {
      const type = userType.currentValue;
      if(type === "patient") {
        this.setupPatientMapView();
      }else if(type === "donor") {
        this.setupDonorMapView();
      }
    }
  }

  ngOnInit() {
    this.loadArcGis()
      .then(([ Map, WebMap, MapView, Graphic, Search, Locator, Extent, GeoPoint, SimpleMarkerSymbol ]) => {
        this.Graphic = Graphic;
        this.Extent  = Extent;
        this.Point   = GeoPoint;
        this.SimpleMarkerSymbol = SimpleMarkerSymbol;

        const mapProperties: any = {
          basemap: 'street'
        };

        const webmapProperties: any = {
          basemap: 'streets',
          portalItem: { // autocasts as new PortalItem()
            id: "2a59a896b06f4d949bb04c5bf9ad08d2"
          }
        };

        const map: any = new WebMap(webmapProperties);

        const mapViewProperties: any = {
          // create the map view at the DOM element in this component
          container: this.mapViewEl.nativeElement,
          zoom: 12,
          center: this.center,
          map // property shorthand for object literal
        };

        this.mapView = new MapView(mapViewProperties);

        this.search  = new Search({
          view: this.mapView
        });
        // Set up a locator task using the world geocoding service
        this.locator = new Locator({
          url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        });

        this.setupMapView();
      });
  }

  setupMapView() {

    //add search field to map view
    this.mapView.ui.add(this.search, {
      position: 'top-right',
      index: 2
    });

    console.log(this.userType);
    //check if the user is a patient/donor to load appropriate map
    if(this.userType === "patient")
      this.setupPatientMapView();
    else
      this.setupDonorMapView();

  }

  /**
   * Setup donor map view
   * add neccessary listeners to the map
   */
  setupPatientMapView() {
    //remove click listener if it exist
    if(!isEmpty(this.clickEvent)) this.clickEvent.remove();

    //add mapview visible area change if it does not exist
    if(isEmpty(this.moveEvent)) {
      this.moveEvent = Observable.create(( observer ) => {

        let handler = this.mapView.watch('extent', (newVal, oldVal) => {
          observer.next(newVal);
        })
        return handler.remove;

      });
      this.setupDonorsEvent();
    }
  }

  /**
   * Setup donor map view
   * add neccessary listeners to the map
   */
  setupDonorMapView() {

    //remove mapview visible area change if it exist
    if(!isEmpty(this.socket)) this.socket.unsubscribe();

    //check if we already have a click listener on map
    //can happen if user uses app bar menu to select the same type
    if(!isEmpty(this.clickEvent)) return;

    //attach click listener if user is a donor
    //this allows a donor click any where on a map to create a pledge
    this.clickEvent = this.mapView.on('click', (event) => {
      // Get the coordinates of the click on the view
      // around the decimals to 3 decimals
      const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
      const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

      let location: { latitude?: Number, longitude?: Number, address?: String} = {};
      location.latitude = lat;
      location.longitude = lon;
      // Execute a reverse geocode using the clicked location
      this.locator.locationToAddress(event.mapPoint)
        .then( (response) =>  {
          // If an address is successfully found, print it to the popup's content
          location.address = response.address.Match_addr;
          this.showCreatePledgePopup(location);
        })
        .otherwise( (err) => {
          this.showCreatePledgePopup(location);
        });
    });
  }

  /**
   * Setup the graphics popup for the donor
   * @param donor
   */
  getDonorGraphics(donor) {
    const markerSymbol = new this.SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2
      }
    });

    const contact = '<div class="esri-popup__actions"><div data-action-index="1" class="esri-popup__action">Click to show</div></div>';
    const email   = '<div class="esri-popup__actions"><div data-action-index="2" class="esri-popup__action">Click to show</div></div>';
    const popAttribute = {
      'Title': 'Donor Information',
      'First Name': donor.first_name,
      'Last Name': donor.last_name,
      'Blood Group': donor.blood_group,
      'Contact Number': donor.contact_number,
      'Email': donor.email,
      'Address': donor.location.address,
    }

    const showContactAction = {
      id: "show-contact",
      title: "Show contact"
    };
    const showEmailAction = {
      id: "show-email",
      title: "Show contact"
    }

    let graphic = new this.Graphic(
      {
        geometry: donor.point,
        symbol: markerSymbol,
        attributes: popAttribute,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: "{Title}",
          actions: [showContactAction, showEmailAction],
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "First Name"
            }, {
              fieldName: "Last Name"
            },{
              fieldName: "Blood Group"
            },{
              fieldName: "Contact Number"
            },{
              fieldName: "Email"
            },{
              fieldName: "Address"
            }]
          }]
        }
      });

      //register action listener
      this.mapView.popup.on('trigger-action', (event) => {
        if(event.action.id === "show-contact") {
          console.log(this.mapView.popup.selectedFeature)
          console.log(this.mapView.popup.content)
        }
      })
      return graphic;
  }

  setupDonorsEvent() {
    const donors = this.donorService.getRealtimeDonors();
    this.socket = this.moveEvent
        .combineLatest(donors, (extent, donors) => {
          return donors
            .map( donor => {
              donor.point = new this.Point({
                latitude: donor.location.latitude,
                longitude: donor.location.longitude
              });
              return donor;
            })
            .filter( donor => {
              return extent.contains(donor.point);
            });

        })
        .subscribe( donors => {

          let graphics = [];
          donors.forEach( donor => {
            let graphic = this.getDonorGraphics(donor)
            graphics.push(graphic);
          });
          this.mapView.graphics.removeAll();
          this.mapView.graphics.addMany(graphics);
        });
  }

  loadArcGis() {
    // only load the ArcGIS API for JavaScript when this component is loaded
    return this.esriLoader
      .load({
        // use a specific version of the JSAPI
        url: 'https://js.arcgis.com/4.3/'
      })
      .then( () => {
        // load the needed Map and MapView modules from the JSAPI
        return this.esriLoader.loadModules([
          'esri/Map',
          'esri/WebMap',
          'esri/views/MapView',
          "esri/Graphic",
          "esri/widgets/Search",
          "esri/tasks/Locator",
          "esri/geometry/Extent",
          "esri/geometry/Point",
          "esri/symbols/SimpleMarkerSymbol",
        ]);
      })
  }
}
