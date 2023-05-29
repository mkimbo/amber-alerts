"use client";

import React, { use, useEffect, useState, useRef } from "react";
import { useAuth } from "../../../auth/hooks";
import styles from "./page.module.scss";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unknown, z } from "zod";
import { PhoneNumberRegex } from "../../../utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../../ui/button";
import { useLoadingCallback } from "react-loading-hook";
import {
  getFileObjectFromBlobUrl,
  getGender,
  getVerifiedCookie,
  setVerifiedCookie,
} from "../../../utils/functions";
import { placeholderUrl } from "../../../utils/constants";
import { set } from "lodash";
import { TPerson } from "@/models/missing_person.model";
import { TMotor } from "@/models/misssing_motor.model";
import { uploadFileToCloud } from "@/auth/firebase";
import { useZact } from "zact/client";
import { saveMotorBanner, savePersonBanner } from "@/app/actions";

type TShareProps = {
  id: string; //u802HmUVqfdjVTTraHZdc
  type: "person" | "motor";
  name: string;
  age?: number;
  gender?: string;
  color?: string;
  licencePlates?: string;
  phoneNumber?: string | number;
  email?: string;
  imageUrl: string;
  bannerUrl?: string;
};

export function SharePage({
  id,
  type,
  name,
  age,
  licencePlates,
  color,
  gender,
  email,
  phoneNumber,
  imageUrl,
  bannerUrl,
}: TShareProps) {
  const { tenant } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [image, setImage] = useState<string>();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { mutate, data, isLoading } = useZact(saveMotorBanner);
  const {
    mutate: sendit,
    data: response,
    isLoading: isRunning,
  } = useZact(savePersonBanner);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas!.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d", {
      preserveDrawingBuffer: true,
    }) as CanvasRenderingContext2D;
    generateImage();
    function addTextWithBackground(
      text: string,
      x: number,
      y: number,
      font: string,
      textColor: string,
      bgColor: string,
      ctx: CanvasRenderingContext2D
    ) {
      // Set font and text color
      ctx.font = font;
      ctx.fillStyle = textColor;

      // Calculate text width and height
      const textWidth = ctx.measureText(text).width;
      const textHeight = parseInt(font, 10); // Extract font size from font string

      // Draw background rectangle
      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y - 12, textWidth, 12);

      // Draw text
      ctx.fillStyle = textColor;
      ctx.fillText(text, x, y);
    }
    function generateImage() {
      const font = "bold 12px Arial";
      const textColor = "black";
      const bgColor = "white";
      if (ctx) {
        try {
          const userImage = new Image();
          userImage.onload = function () {
            if (!canvas) return;
            ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);

            // Add missing person details
            ctx.font = "bold 18px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(
              type === "person" ? `MISSING PERSON` : "REPORTED MISSING",
              70,
              20
            );

            addTextWithBackground(
              `Name: ${name} `,
              10,
              210,
              font,
              textColor,
              bgColor,
              ctx
            );
            type === "person"
              ? addTextWithBackground(
                  `Age: ${age} `,
                  10,
                  225,
                  font,
                  textColor,
                  bgColor,
                  ctx
                )
              : addTextWithBackground(
                  `Licence plates: ${licencePlates} `,
                  10,
                  225,
                  font,
                  textColor,
                  bgColor,
                  ctx
                );
            type === "person"
              ? addTextWithBackground(
                  `Gender: ${getGender(gender!)} `,
                  10,
                  240,
                  font,
                  textColor,
                  bgColor,
                  ctx
                )
              : addTextWithBackground(
                  `Color: ${color} `,
                  10,
                  225,
                  font,
                  textColor,
                  bgColor,
                  ctx
                );
            addTextWithBackground(
              "Any info? please contact: ",
              10,
              260,
              font,
              textColor,
              bgColor,
              ctx
            );
            addTextWithBackground(
              `Phone: ${phoneNumber} `,
              10,
              275,
              font,
              textColor,
              bgColor,
              ctx
            );
            addTextWithBackground(
              `Email: ${tenant?.email} `,
              10,
              290,
              font,
              textColor,
              bgColor,
              ctx
            );
          };

          userImage.src = imageUrl;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [
    type,
    name,
    age,
    licencePlates,
    color,
    gender,
    email,
    phoneNumber,
    imageUrl,
  ]);

  // useEffect(() => {
  //   saveImage();
  //   async function saveImage() {
  //     if (image && !bannerUrl) {
  //       const file = await getFileObjectFromBlobUrl(image);
  //       const url = await uploadFileToCloud(file);
  //       if (type == "motor" && url) {
  //         mutate({
  //           bannerUrl: url,
  //           itemId: id,
  //         });
  //       }
  //       if (type == "person" && url) {
  //         sendit({
  //           bannerUrl: url,
  //           itemId: id,
  //         });
  //       }
  //     }
  //   }
  // }, [image]);

  function getFile() {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a new File object from the Blob
          const file = new File([blob], "edited_image.png", {
            type: "image/png",
          });
          const url = URL.createObjectURL(blob);
          console.log(canvas.toDataURL("image/png"), "link", file);
          setImage(url);
        }
      });
    }
  }

  const redirect = searchParams?.get("redirect") || "/";

  if (!tenant) {
    return null;
  }
  return (
    <div>
      <h3>Share poster</h3>
      <p>To social media</p>
      <div>
        <canvas ref={canvasRef} />
        <Button
          // loading={isRegisterLoading}
          // disabled={isRegisterLoading}
          onClick={() => getFile()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
