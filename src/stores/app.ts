import ILatLon from "../types/latlon";
import ILocalWeather from "../types/local-weather";
import IGeolocation from "../types/geolocation";
import LatLon from "../models/latlon";
import LocalWeather from "../models/local-weather";
import Geolocation from "../models/geolocation";

import { 
    action,
    makeObservable,
    observable
} from "mobx";


export default class AppStore {

    /** As referenced in /docs/NOTES.md#Types-and-models */
    
    /** All locations data stored */
    locations = observable.map<number, ILatLon>();
    localWeathers = observable.map<number, ILocalWeather>();
    geolocations = observable.map<number, IGeolocation>();

    /** Locations in order, note: sets are in insertion order; contain no duplicates */
    locationOrder = observable.set<number>();

    constructor() {
        makeObservable(this);
    }

    /**
     * 
     * @param latLon a ILatLon to search for
     * @returns a Geolocation or undefined if not found
     */
    getGeolocation(latLon: ILatLon): IGeolocation | undefined {
        const res = Array.from(this.locations.entries()).find(([id, aLatLon]: [number, ILatLon]) => {
            return LatLon.equals(aLatLon, latLon);
        });
        return res === undefined ? undefined : this.geolocations.get(res[0]);
    }

    /**
     * 
     * @param latLon a ILatLon to search for
     * @returns a LocalWeather or undefined if not found
     */
    getLocalWeather(latLon: ILatLon) {
        const res = Array.from(this.locations.entries()).find(([id, aLatLon]: [number, ILatLon]) => {
            return LatLon.equals(aLatLon, latLon);
        });
        return res === undefined ? undefined : this.localWeathers.get(res[0]);
    }

    /**
     * 
     * @param latLon a ILatLon to search locations for
     * @returns a LocationId unique to this LatLon or -1 if it doesn't exist
     */
    getLocationId(latLon: ILatLon) {
        const res = Array.from(this.locations.entries()).find(([id, aLatLon]: [number, ILatLon]) => {
            return LatLon.equals(aLatLon, latLon);
        });
        return res === undefined ? -1 : res[0];
    }

    /**
     * 
     * Add a LatLon, LocalWeather pair to the store
     * 
     * Note: stored locations do not display unless in `locationOrder`
     * 
     * @param latLon a ILatLon type, the LatLon of the provided localWeather
     * @param localWeather a ILocalWeather type, the LocalWeather data
     */
    @action loadLocalWeather(latLon: ILatLon, localWeather: ILocalWeather) {

        let locationId = this.getLocationId(latLon);
        if (locationId === -1) {
            locationId = this.locations.size;
            this.locations.set(locationId, new LatLon(latLon));
            this.localWeathers.set(locationId, new LocalWeather(localWeather));
        } else {
            this.localWeathers.set(locationId, new LocalWeather(localWeather));
        }
    }

    /**
     * 
     * Add a LatLon, geolocation pair to the store
     * 
     * Note: stored locations do not display unless in `locationOrder`
     * 
     * @param latLon a ILatLon type, the LatLon of the provided geolocation
     * @param geolocation a geolocation type, the geolocation data
     */
    @action loadGeolocation(latLon: ILatLon, geolocation: IGeolocation) {

        let locationId = this.getLocationId(latLon);
        if (locationId === -1) {
            locationId = this.locations.size;
            this.locations.set(locationId, new LatLon(latLon));
            this.geolocations.set(locationId, new Geolocation(geolocation));
        } else {
            this.geolocations.set(locationId, new Geolocation(geolocation));
        }
    }

    /**
     * 
     * The given order of locations to render.
     * Will remove duplicates if found
     * 
     * Usage:
     *  First make a copy of the current order
     *  Then make changes to that order and set that order with this method
     * 
     * TODO: Check if this is correct and there are no deep/shallow copy issues
     * 
     * @param locationOrder An array of number `locationIds` to show. Must not have any `locationIds` outside of `locations`
     */
    @action reorderLocations(locationOrder: number[]) {
        const valid = locationOrder.some((locationId: number) => {
            return !this.locations.has(locationId);
        });
        if (!valid) {
            throw 'A locationId does not exist';
        }
        this.locationOrder = observable.set(new Set(locationOrder));
    }

}