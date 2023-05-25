"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../../../ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <Button onClick={() => router.push("/alerts")}>Back to Alerts</Button>
    </div>
  );
}
