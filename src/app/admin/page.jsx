import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const router = useRouter();
  const { show, hide, loading } = useLoading();
  useEffect(() => {
    show();
    router.replace("/admin/dashboard");
    // Optionally show a toast
    // toast.success("Redirecting to admin dashboard...");
    hide();
  }, [router, show, hide]);
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <span className="text-white text-xl">Loading...</span>
        </div>
      )}
      Redirecting to admin dashboard...
    </div>
  );
};

export default AdminPage;
