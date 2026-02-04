import { useSelector } from "react-redux";
import { DashboardRootState } from "../store";
import { WorkStatus } from "../../shared/types";
import { WorkStatusItem } from "./WorkStatusItem";
import { useEffect, useRef } from "react";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const saveMessageCard = useRef<HTMLDivElement>(null);
  const statuses: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  // Show save message when work status changes
  useEffect(() => {
    let saveMessageTimeout: any;
    if (profile.workStatus) {
      if (saveMessageCard.current) {
        saveMessageCard.current.style.opacity = "100";
      }
      saveMessageTimeout = setTimeout(() => {
         if (saveMessageCard.current) {
           saveMessageCard.current.style.opacity = "0";
         }
      }, 1000);
    }
    return () => {
      if (saveMessageTimeout) clearTimeout(saveMessageTimeout);
    };
  }, [profile.workStatus]);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2">
        <p>What's your current availability for new opportunities?</p>
        <div className="flex flex-col gap-2 mt-4">
        {Object.entries(statuses).map(([key, label]) => (
          <WorkStatusItem
            key={`dashboardWorkStatus-${key}`}
            value={key as WorkStatus}
            label={label}
            currentStatus={profile.workStatus}
          />
        ))}
        </div>
        <div ref={saveMessageCard} className="bg-green-200 mt-2 p-3 rounded-lg transition-opacity duration-500" style={{ opacity: 0 }}>Work status updated</div>
      </div>
    </div>
  );
};
