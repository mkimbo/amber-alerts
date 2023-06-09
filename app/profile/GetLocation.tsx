"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks";
import { Button } from "../../ui/button";
import { getGeoHash } from "../../utils/functions";
import { useZact } from "zact/client";
import { updateUser } from "../actions";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";

type TButtonProps = {
  enabledLocation?: boolean;
};

export function SaveLocationButton({ enabledLocation }: TButtonProps) {
  const { tenant } = useAuth();
  const { mutate, data, isLoading } = useZact(updateUser);
  const [disabled, setDisabled] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<any>();

  // const handleClick = () => {
  //   setDisabled(true);
  //   const id = setTimeout(() => {
  //     setDisabled(false);
  //   }, 60000);
  //   setTimeoutId(id);
  // };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId); // Clear the timer if the component is unmounted before the timeout completes
    };
  }, []);

  const handleGetLocation = () => {
    const successCallback = async (geoPosition: GeolocationPosition) => {
      const position = {
        lat: geoPosition?.coords?.latitude,
        lng: geoPosition?.coords?.longitude,
      };
      const geohash = getGeoHash(position);
      await mutate({
        id: tenant?.id!,
        geohash: geohash,
        lat: geoPosition?.coords?.latitude,
        lng: geoPosition?.coords?.longitude,
        enabledLocation: true,
      });

      if (data?.success) {
        toast.success("Location updated successfully");
        //  revalidatePath("/profile");

        // handleClick();
        return true;
      } else {
        return false;
      }
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error);
      return false;
    };

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    if ("geolocation" in navigator) {
      // Access the API
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        geolocationOptions
      );
    } else {
      // Use a third-party geolocation service
      toast.error("Browser does not support the Geolocation API");
    }
  };

  if (!tenant) {
    return null;
  }

  return (
    <Button
      loading={isLoading}
      disabled={isLoading || disabled}
      onClick={handleGetLocation}
      style={{ width: "100%" }}
    >
      {enabledLocation ? "Update Location" : "Enable Location"}
    </Button>
  );
}
