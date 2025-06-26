import { useLoading } from "@/context/LoadingContext";
import Loading from "@/app/loading";

export default function LoadingOverlay() {
  const { loading } = useLoading();
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <Loading />
    </div>
  );
}
