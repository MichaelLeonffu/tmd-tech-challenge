import ILatLon from "../types/latlon";
import LocalWeather from "../models/local-weather";

import { 
    action,
    makeObservable,
    observable
} from "mobx";

export default class AppStore {

    /** As referenced in /docs/NOTES.md#Types-and-models */
    
    /** All locations data stored */
    locations = observable.map<ILatLon, LocalWeather>();
    /** Locations in order, note: sets are in insertion order; contain no duplicates */
    locationOrder = observable.set<ILatLon>();

    constructor() {
        makeObservable(this);
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
    @action load(latLon: ILatLon, localWeather: LocalWeather) {
        this.locations.set(latLon, localWeather);
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
     * @param locationOrder An array of ILatLon locations to show.
     */
    @action reorderLocations(locationOrder: ILatLon[]) {
        this.locationOrder = observable.set(new Set(locationOrder));
    }

}