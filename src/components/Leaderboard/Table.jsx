import React, { useEffect } from "react";
import { Pagination } from "./Pagination";

const Table = ({ page = 1, totalPages = 1, setPage, PaginationData, limit, setLimit,scrollRef, currentUserRef }) => {
  if (!PaginationData || PaginationData.length === 0) return null;

 
 const subjects = PaginationData.length > 0 
  ? PaginationData[0].subjects.map(s => s.subjectId.title) 
  : [];

  useEffect(() => {
      const tableEl = scrollRef.current;
      const userEl = currentUserRef.current;
      if (!tableEl || !userEl) return;
      
      const handleScroll = () => {
        // console.log(tableEl,userEl)
        userEl.scrollLeft = tableEl.scrollLeft;
      };
  
      tableEl.addEventListener("scroll", handleScroll);
      return () => tableEl.removeEventListener("scroll", handleScroll);
    }, []);
  

  return (
    <div className="w-full h-[calc(100vh - 72px)] flex flex-col mb-20">
      <div className="rounded-xl border border-[var(--q3-stroke-light)] shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Table header */}
        <div className="overflow-x-auto flex-1 scrollbar-hide "  ref={scrollRef}>
          <table className="min-w-[700px] w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[50px]" />
              <col className="w-[200px]" />
              <col className="w-[120px]" />
              {subjects.map((_, idx) => (
                <col key={idx} className="w-[100px]" />
              ))}
              <col className="w-[100px]" />
            </colgroup>

            <thead className="bg-[var(--q3-surface-dim)] sticky top-0 z-10">
              <tr className="h-16">
                <th className="px-4 py-2 text-left font-medium text-sm text-[var(--q3-neutral-default)]">
                  Rank
                </th>
                <th className="px-4 py-2 text-left font-medium text-sm text-[var(--q3-neutral-default)]">
                  Student Name
                </th>
                <th className="px-4 py-2 text-center font-medium text-sm text-[var(--q3-neutral-light)]">
                  Overall Score
                </th>

                {/* Dynamic subject headers */}
                {subjects.map((sub) => (
                  <th
                    key={sub}
                    className="px-4 py-2 text-center font-medium text-sm text-[var(--q3-neutral-light)]"
                  >
                    {sub === "Physics" ? "Phy" : sub === "Chemistry" ? "Chem" : sub==="Mathematics"?"Maths":sub}
                  </th>
                ))}

                <th className="px-4 py-2 text-center font-medium text-sm text-[var(--q3-neutral-light)]">
                  Accuracy
                </th>
              </tr>
            </thead>

            <tbody className="overflow-y-auto scrollbar-hide">
              {PaginationData.map((student, index) => (
                <tr
                  key={index}
                  className="border-t border-[var(--q3-stroke-light)] hover:bg-[var(--table-hover)] h-16 bg-[var(--q3-surface-default)]"
                >
                  <td className="px-4 py-2">
                    <span
                      className="w-6 h-6 text-xs flex items-center justify-center rounded-full border border-[var(--q3-stroke-normal)] bg-[var(--q3-surface-dim)] text-[var(--q3-neutral-default)] font-medium"
                      style={{
                        background:
                          student.rank === 1
                            ? "var(--rank1-rank-number-bg)"
                            : student.rank === 2
                            ? "var(--rank2-rank-number-bg)"
                            : student.rank === 3
                            ? "var(--rank3-rank-number-bg)"
                            : "var(--q3-surface-dim)",
                      }}
                    >
                      {student.rank}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-medium truncate ">
                    <div className="flex items-center justify-start gap-2">
                      <img
                        src={student.userId.profilePicture || "/user-icon.png"}
                        alt={student.userId.name}
                        className="w-8 h-8 rounded-full object-cover border border-[var(--q3-stroke-light)]"
                      />
                      <span className="truncate text-sm font-bold text-[var(--q3-neutral-default)]">
                        {student.userId.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <p className="bg-[var(--q3-surface-dim)] inline-block px-3 py-1 rounded-full text-[var(--q3-neutral-light)] font-medium">
                      <span className="text-[var(--q3-neutral-default)] font-bold">
                        {student.totalMarkScored}
                      </span>{" "}
                      / 300
                    </p>
                  </td>

                  {/* Dynamic subject marks */}
                  {subjects.map((sub) => {
                    const subject = student.subjects.find((s) => s.subjectId.title === sub);
                    return (
                      <td
                        key={sub}
                        className="px-4 py-2 text-center text-[var(--q3-neutral-default)] font-medium"
                      >
                        {subject ? subject.totalMarkScored : "-"}
                      </td>
                    );
                  })}

                  <td className="px-4 py-2 text-center text-[var(--q3-neutral-default)] font-medium">
                    {Number.isInteger(student.accuracy)
                      ? student.accuracy
                      : student.accuracy.toFixed(2)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="w-full h-[72px] flex justify-center items-center bg-[var(--q3-surface-default)] border-t border-[var(--q3-stroke-light)] overflow-x-auto px-10">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(e) => setPage(e)}
            limit={limit}
            onLimitChange={(e) => setLimit(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
