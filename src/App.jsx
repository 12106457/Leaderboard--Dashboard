import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchLeaderboard } from "./utils/api";
import Header from "./components/Leaderboard/header";
import { LeaderboardCard } from "./components/Leaderboard/LeaderboardCard";
import Table from "./components/Leaderboard/Table";
import CurrentUserDetails from "./components/Leaderboard/CurrentUserDetails";

const App = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [top3Ranks, setTop3Ranks] = useState([]);
  const [otherUserRanks, setOtherUserRanks] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState({});

  const tableWrapperRef = useRef(null);
  const currentUserRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // watch for resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  setLoading(true);
  setError(null);

  fetchLeaderboard(page,limit)
    .then((res) => {
      // normalize possible shapes to an array called `items`
      const payload = res?.data ?? res; // prefer res.data, fall back to res itself
      let items = [];

      if (Array.isArray(payload)) {
        items = payload;
      } else if (payload == null) {
        items = [];
      } else if (Array.isArray(payload.items)) {
        items = payload.items;
      } else if (Array.isArray(payload.results)) {
        items = payload.results;
      } else if (typeof payload === "object") {
        // if payload is an object with numeric keys: {0: {...}, 1: {...}}
        const numericKeys = Object.keys(payload).filter((k) => /^\d+$/.test(k));
        if (numericKeys.length) {
          items = numericKeys.map((k) => payload[k]);
        } else {
          // fallback: try values (may not be what you want)
          items = Object.values(payload).filter((v) => v && typeof v === "object");
        }
      } else {
        items = [];
      }

      // now items is guaranteed to be an array
      if (isDesktop) {
        if (page === 1) {
          setTop3Ranks(items.slice(0, 3));
          setOtherUserRanks(items.slice(3));
        } else {
          setOtherUserRanks(items);
        }
      } else {
        setOtherUserRanks(items);
        setTop3Ranks([]); // clear top 3 on mobile
      }

      // setData(items);
      // handle totalPages/userRank from different shapes too
      setTotalPages(res?.totalPages ?? res?.meta?.totalPages ?? 1);
      setCurrentUserRank(res?.userRank ?? res?.user_rank ?? res?.user ?? {});
    })
    .catch((err) => setError(err?.message || "Failed to fetch"))
    .finally(() => setLoading(false));
}, [page,limit, isDesktop]);

  return (
    <div
      className="min-h-screen max-w-screen flex flex-col items-center justify-start p-4 space-y-2"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Header />
      <div className="pt-32 md:pt-24"/>

      {loading && <p className="mt-10">Loading leaderboard...</p>}
      {error && <p className="mt-10 text-red-500">{error}</p>}

      {!loading && !error && otherUserRanks.length === 0 && (
        <p className="mt-10">No leaderboard data available.</p>
      )}

      {!loading && !error && top3Ranks.length > 0 && (
        <div
          className="hidden md:flex flex-wrap gap-6 justify-center mt-10 rounded-3xl p-6 "
          style={{
            background: "var(--q3-surface-glass-normal)",
            backdropFilter: "blur(16px)",
          }}
        >
          {top3Ranks.map((user) => (
            <LeaderboardCard key={top3Ranks.rank} 
            accuracy={user.accuracy}
            chemistry={user.subjects[2].totalMarkScored}
            image={user.userId.profilePicture}
            maths={user.subjects[0].totalMarkScored}
            maxScore={300}
            name={user.userId.name}
            overall={user.totalMarkScored}
            physics={user.subjects[1].totalMarkScored}
            rank={user.rank}
            />
          ))}
          <LeaderboardCard 
            accuracy={currentUserRank.accuracy}
            chemistry={currentUserRank.subjects[2].totalMarkScored}
            image={currentUserRank.userId.profilePicture}
            maths={currentUserRank.subjects[0].totalMarkScored}
            maxScore={300}
            name={currentUserRank.userId.name}
            overall={currentUserRank.totalMarkScored}
            physics={currentUserRank.subjects[1].totalMarkScored}
            rank={currentUserRank.rank}
            />
        </div>
      )}

      {otherUserRanks.length > 0 &&
        <div className="w-full flex-1 relative">
        <Table PaginationData={otherUserRanks} setPage={setPage} page={page} totalPages={totalPages} setLimit={setLimit} limit={limit} scrollRef={tableWrapperRef} currentUserRef={currentUserRef} />

        
        <CurrentUserDetails currentUser={currentUserRank}  scrollRef={currentUserRef}/>
      </div>
      }

    </div>
  );
};

export default App;
