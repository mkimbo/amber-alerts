"use client";
import React, { useState } from "react";
import styles from "./socialShare.module.scss";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

// import { useLoadingCallback } from "react-loading-hook";
// import { Button } from "@/ui/button";

type SocialShareProps = {
  url: string;
  title: string;
  description: string;
  hashtag?: string;
};

export default function SocialShareButtons({
  url,
  title,
  description,
  hashtag,
}: SocialShareProps) {
  return (
    <div className={styles.socialShareButtons}>
      <span>Share on social media </span>
      <div className={styles.buttonsRow}>
        <FacebookShareButton url={url} quote={description} hashtag={hashtag}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} />
        </WhatsappShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </div>
    </div>
  );
}
