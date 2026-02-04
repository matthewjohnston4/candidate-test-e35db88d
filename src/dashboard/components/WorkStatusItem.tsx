import { useDispatch } from "react-redux";
import { DashboardDispatch } from "../store";
import { WorkStatus } from "../../shared/types";
import { updateWorkStatus } from "../store/userSlice";

const icons: Record<WorkStatus, string> = {
    looking: "🟢",
    passive: "🔵",
    not_looking: "⛔",
}

export const WorkStatusItem = ({
  value,
  label,
  currentStatus,
}: {
  value: WorkStatus;
  label: string;
  currentStatus: WorkStatus;
}) => {
  const dispatch = useDispatch<DashboardDispatch>();
  const handleStatusChange = (status: WorkStatus) => {
    dispatch(updateWorkStatus(status));
  };
  return (
    <div
      onClick={() => handleStatusChange(value)}
      className={`p-3 border-2 transition-[border-color] duration-300 ${currentStatus === value ? "border-blue-500" : "border-gray-200 hover:border-blue-200"} rounded-lg bg-white cursor-pointer`}
    >
        <span className="mr-2">{icons[value]}</span>
        <span className="text-md font-medium">{label}</span>
    </div>
  );
};
