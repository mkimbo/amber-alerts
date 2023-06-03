"use client";
import { useZact } from "zact/client";
type Props = {
  itemId: string;
  found?: boolean;
  type: "person" | "vehicle" | "bike";
};
import { Button } from "@/ui/button";
import { markMotorFound, markPersonFound } from "../actions";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function MarkAsFoundButton({ itemId, found, type }: Props) {
  const {
    mutate: sendit,
    data: res,
    isLoading: isRunning,
  } = useZact(markPersonFound);
  const { mutate, data, isLoading } = useZact(markMotorFound);
  useEffect(() => {
    if (data?.success || res?.success) {
      toast.success("Updated Successfully");
    }
  }, [data, res]);
  return (
    <Button
      loading={isLoading || isRunning}
      disabled={isLoading || isRunning || found}
      onClick={() => {
        if (type === "person") {
          sendit({ itemId, type });
        } else {
          mutate({ itemId, type });
        }
      }}
    >
      {found ? "Found" : "Mark as Found"}
    </Button>
  );
}
