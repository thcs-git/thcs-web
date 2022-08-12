import { AxiosResponse } from "axios";

import { GlobalAddressInterface } from "./types";

import { googleMaps } from "../../../services/axios";

export async function getGeolocation(address: GlobalAddressInterface) {
  if (address.postal_code) {
    let { street, number, district, city, state } = address;

    try {
      const { data: googleAddressData }: AxiosResponse = await googleMaps.get(
        `/geocode/json?address=${street},${number},${district},${city},${state}`
      );

      console.log("googleAddressData", googleAddressData);

      if (googleAddressData.results) {
        const { lat: latitude, lng: longitude } =
          googleAddressData.results[0].geometry.location;
        return { latitude, longitude };
      }
    } catch (e: any) {
      console.error("Get google maps data", e.message);
    }
  }
}
