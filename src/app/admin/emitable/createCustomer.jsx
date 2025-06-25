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
import { Toaster, toast } from "react-hot-toast";

const defaultValues = {
  customerName: "",
  mobileNo: "",
  suretyName: "",
  suretyMobileNo: "",
  vehicleNo: "",
  hsnNo: "",
  suretyAddress: "",
  customerAddress: "",
  emiMonths: "",
  emiAmount: "",
  totalAmount: "",
};

const branches = ["Main Branch", "Branch A", "Branch B", "Branch C"];

export default function CreateCustomerDialog({ onCreate }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/customers/addcustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
        const result = await res.json();
        console.log("Create Customer Response:", result);
      if (result.ok ) {
        toast.success("Customer created successfully!");
        if (onCreate) onCreate(result.customer);
        reset();
      } else {
          
        toast.error(result.message || "Failed to create customer");
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
          <Button variant="outline">+ Create Customer</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-pink-400">
              Create Customer
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Customer Name
              </Label>
              <Input
                {...register("customerName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Mobile No.
              </Label>
              <Input
                {...register("mobileNo")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Surety Name
              </Label>
              <Input
                {...register("suretyName")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Surety Mobile No.
              </Label>
              <Input
                {...register("suretyMobileNo")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Vehicle No.
              </Label>
              <Input
                {...register("vehicleNo")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                HSN No.
              </Label>
              <Input
                {...register("hsnNo")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Surety Address
              </Label>
              <Input
                {...register("suretyAddress")}
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Customer Address
              </Label>
              <Input
                {...register("customerAddress")}
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                EMI Months
              </Label>
              <Input
                type="number"
                {...register("emiMonths")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            {/* <div>
            <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
              EMI Amount
            </Label>
            <Input
              type="number"
              {...register("emiAmount")}
              required
              className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
            />
          </div> */}
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Total Amount
              </Label>
              <Input
                type="number"
                {...register("totalAmount")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Interest Rate (%)
              </Label>
              <Input
                type="number"
                step="0.01"
                {...register("intrestRate")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
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
            <div>
              <Label className="text-gray-700 dark:text-gray-200 mb-1 block">
                Garage Date
              </Label>
              <Input
                type="date"
                {...register("garageDate")}
                required
                className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="col-span-full text-center mt-4">
              <Button
                type="submit"
                className="w-full rounded-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.03] transition-transform dark:from-purple-700 dark:via-fuchsia-700 dark:to-pink-700 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Customer"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
