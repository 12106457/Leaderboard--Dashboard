import React, { useEffect } from "react";

const CurrentUserDetails = ({ currentUser,scrollRef }) => {
   
  return (
    <div className="fixed bottom-0 left-0 w-full px-4 z-50">
      <div className="w-full rounded-t-xl shadow border border-[var(--q3-stroke-light)] bg-[var(--q3-surface-dimmest)] bg-opacity-100 overflow-x-auto" ref={scrollRef}>
        <table className="min-w-[700px] w-full table-fixed text-sm">
          <colgroup>
            <col className="w-[50px]" />
            <col className="w-[200px]" />
            <col className="w-[120px]" />
            <col className="w-[80px]" />
            <col className="w-[80px]" />
            <col className="w-[80px]" />
            <col className="w-[100px]" />
          </colgroup>
          <tbody>
            <tr className="h-16">
              <td className="px-4 py-2">
                <span className="w-6 h-6 text-xs flex items-center justify-center rounded-full border border-[var(--q3-stroke-normal)] bg-[var(--q3-surface-dim)] text-[var(--q3-neutral-default)] font-medium">
                  {currentUser.rank}
                </span>
              </td>
              <td className="px-4 py-2 font-medium truncate">
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.userId.profilePicture || "/user-icon.png"}
                    alt={currentUser.userId.name}
                    className="w-8 h-8 rounded-full object-cover border border-[var(--q3-stroke-light)]"
                  />
                  <span className="truncate text-sm font-bold text-[var(--q3-neutral-default)]">
                    {currentUser.userId.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <p className="bg-[var(--q3-surface-dim)] inline-block px-3 py-1 rounded-full text-[var(--q3-neutral-light)] font-medium">
                  <span className="text-[var(--q3-neutral-default)] font-bold">
                    {currentUser.totalMarkScored}
                  </span>{" "}
                  / 300
                </p>
              </td>
              <td className="px-4 py-2 text-center text-[var(--q3-neutral-default)] font-medium">
                {currentUser.subjects[1].totalMarkScored}
              </td>
              <td className="px-4 py-2 text-center text-[var(--q3-neutral-default)] font-medium">
                {currentUser.subjects[2].totalMarkScored}
              </td>
              <td className="px-4 py-2 text-center text-[var(--q3-neutral-default)] font-medium">
                {currentUser.subjects[0].totalMarkScored}
              </td>
              <td className="px-4 py-2 text-center text-[var(--q3-neutral-default)] font-medium">
                {Number.isInteger(currentUser.accuracy)
                  ? currentUser.accuracy
                  : currentUser.accuracy.toFixed(2)}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentUserDetails;
