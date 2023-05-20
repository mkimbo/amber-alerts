const geofire = require("geofire-common");
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import Cookies from "js-cookie";
import { TDetailedLocation } from "../models/missing_person.model";
export const loadScript = (
  src: string,
  position: HTMLElement | null,
  id: string
) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getGeoHash = (geoloc: { lat: number; lng: number }) => {
  const hash = geofire?.geohashForLocation([geoloc.lat, geoloc.lng]);
  return hash;
};

export const setVerifiedCookie = (val: string) => {
  // Set a cookie
  const cookieName = "userVerified";
  const cookieValue = val;
  const cookieOptions = {
    path: "/",
    expires: 7,
    //httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
  };
  console.log("setting cookie", cookieName, cookieValue, cookieOptions);
  Cookies.set(cookieName, cookieValue, cookieOptions);
  //setCookie(cookieName, cookieValue, cookieOptions);
};

export const deleteVerifiedCookie = () => {
  Cookies.remove("userVerified");
};

export const getVerifiedCookie = () => {
  return Cookies.get("userVerified");
};

export const truncateText = (str: string, n: number, b?: boolean) => {
  if (str.length <= n) {
    return str;
  }
  const useWordBoundary = b != null ? b : true;
  const subString = str.substring(0, n - 1); // the original check
  return useWordBoundary
    ? subString.substring(0, subString.lastIndexOf(" "))
    : subString;
};

export const processPlaceDetails: (
  place: google.maps.places.PlaceResult
) => Promise<TDetailedLocation | null> = async (place) => {
  const placeId = place.place_id;
  if (!placeId) {
    return null;
  }
  let geoloc: google.maps.LatLngLiteral;
  let geohash: string = "";
  let longAddress: string = "";
  let formattedAddress: string = place.formatted_address
    ? place.formatted_address
    : "";
  let county: string = "";
  let constituency: string = "";
  const results = await geocodeByPlaceId(placeId);
  //get lat long
  const latLng = await getLatLng(results[0]);
  geoloc = latLng;
  //get geohash
  geohash = getGeoHash(latLng);
  //get county & constituency
  const addressComponents = place.address_components;
  if (addressComponents?.length) {
    const longNameArray = addressComponents.map(
      (component) => component.long_name
    );
    longAddress = longNameArray.join(",");
    const countyName = longNameArray.find((name) => name.includes("County"));
    const constituencyName = longNameArray.find((name) =>
      name.includes("Consituency")
    );
    county = countyName ? countyName : "";
    constituency = constituencyName ? constituencyName : "";
  }
  const detailedLocation: TDetailedLocation = {
    placeId,
    geoloc,
    geohash,
    longAddress,
    formattedAddress,
    county,
    constituency,
  };
  console.log("detailedLocation", detailedLocation);
  return detailedLocation;
};
