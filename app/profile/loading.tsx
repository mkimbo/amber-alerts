import { LoadingIcon, PageLoader } from "../../ui/icons";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <PageLoader />
    </div>
  );
}
