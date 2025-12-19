import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const trackingStatuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

const TrackingModal = ({ isOpen, closeModal, orderId, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (trackingData) => {
      // API call to push new tracking object into the trackingHistory array
      const res = await axiosSecure.patch(
        `/orders/add-tracking/${orderId}`,
        trackingData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Tracking updated!");
      refetch();
      closeModal();
      reset();
    },
  });

  const onSubmit = (data) => {
    const update = {
      ...data,
      updatedAt: new Date(),
    };
    mutation.mutate(update);
    refetch();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Production Status</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold">Current Status</label>
            <select
              className="select select-bordered w-full"
              {...register("status")}
              required
            >
              {trackingStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label font-semibold">Location</label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="e.g. Factory Floor 2"
              {...register("location")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Note</label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Any specific updates..."
              {...register("note")}
            ></textarea>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackingModal;
