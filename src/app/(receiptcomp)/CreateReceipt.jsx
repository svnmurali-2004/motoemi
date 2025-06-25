import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

const defaultValues = {
  receiptNumber: "",
  date: "",
  time: "",
  registeredOwner: "",
  ownerParentName: "",
  ownerAddress: "",
  registrationNumber: "",
  model: "",
  classToVehicle: "",
  chassisNumber: "",
  engineNumber: "",
  makersName: "",
  monthYearOfManufacture: "",
  colorOfVehicle: "",
  sellerName: "",
  sellerParentName: "",
  sellerAddress: "",
  sellerIDProof: "",
  sellerPhone: "",
  purchaserName: "",
  purchaserParentName: "",
  purchaserAddress: "",
  purchaserIDProof: "",
  purchaserPhone: "",
  branch: "",
};

const branches = ["Main Branch", "Branch A", "Branch B", "Branch C"];

export default function CreateReceiptDialog({ onCreate }) {
  const { data: session } = useSession();
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (session?.user?.role === "employee" && session.user.branch) {
      setValue("branch", session.user.branch);
    }
  }, [session, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/deliveryreceipts/createreceipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Receipt created successfully!");
        if (onCreate) onCreate(data);
        reset();
      } else {
        toast.error(result.error || "Failed to create receipt");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">+ Create Receipt</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-pink-400">
              Create Delivery Receipt
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Receipt Number
              </Label>
              <Input
                {...register("receiptNumber")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Date
              </Label>
              <Input
                type="date"
                {...register("date")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Time
              </Label>
              <Input
                type="time"
                {...register("time")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Registered Owner
              </Label>
              <Input
                {...register("registeredOwner")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Owner Parent Name
              </Label>
              <Input
                {...register("ownerParentName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Owner Address
              </Label>
              <Input
                {...register("ownerAddress")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Registration Number
              </Label>
              <Input
                {...register("registrationNumber")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Model
              </Label>
              <Input
                {...register("model")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Class
              </Label>
              <Input
                {...register("classToVehicle")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Chassis Number
              </Label>
              <Input
                {...register("chassisNumber")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Engine Number
              </Label>
              <Input
                {...register("engineNumber")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Maker's Name
              </Label>
              <Input
                {...register("makersName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Month & Year of Manufacture
              </Label>
              <Input
                {...register("monthYearOfManufacture")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Color
              </Label>
              <Input
                {...register("colorOfVehicle")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Seller Name
              </Label>
              <Input
                {...register("sellerName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Seller Parent Name
              </Label>
              <Input
                {...register("sellerParentName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Seller Address
              </Label>
              <Input
                {...register("sellerAddress")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Seller ID Proof
              </Label>
              <Input
                {...register("sellerIDProof")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Seller Phone
              </Label>
              <Input
                {...register("sellerPhone")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Purchaser Name
              </Label>
              <Input
                {...register("purchaserName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Purchaser Parent Name
              </Label>
              <Input
                {...register("purchaserParentName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Purchaser Address
              </Label>
              <Input
                {...register("purchaserAddress")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Purchaser ID Proof
              </Label>
              <Input
                {...register("purchaserIDProof")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Purchaser Phone
              </Label>
              <Input
                {...register("purchaserPhone")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            {session?.user?.role === "admin" ? (
              <div>
                <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                  Branch
                </Label>
                <select
                  {...register("branch")}
                  required
                  className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100 px-3 py-2"
                >
                  <option
                    value=""
                    className="text-gray-500 bg-white/90 dark:bg-zinc-800/80 dark:text-gray-400 italic"
                  >
                    Select branch
                  </option>
                  {branches.map((b) => (
                    <option
                      key={b}
                      value={b}
                      className="bg-white/90 dark:bg-zinc-800/80 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-purple-900 transition-colors"
                    >
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            ) : session?.user?.role === "employee" ? (
              <input
                type="hidden"
                {...register("branch")}
                value={session.user.branch}
              />
            ) : null}
            <div className="col-span-full text-center mt-4">
              <Button
                type="submit"
                className="w-full rounded-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.03] transition-transform dark:from-purple-700 dark:via-fuchsia-700 dark:to-pink-700 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Receipt"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
