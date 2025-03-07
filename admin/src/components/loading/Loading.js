import { Loader2 } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="h-[100vh] w-auto flex items-center justify-center m-auto">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
