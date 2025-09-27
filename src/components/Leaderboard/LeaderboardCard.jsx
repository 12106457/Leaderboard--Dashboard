import { Avatar } from "../ui/avatar";
import { Trophy, Target, Checks, Flask, MathOperations, Atom } from "phosphor-react";

export function LeaderboardCard({
  rank,
  name,
  image,
  overall,
  maxScore,
  physics,
  chemistry,
  maths,
  accuracy,
}) {
  
  const bg =
    rank === 1
      ? "var(--rank1-bg)"
      : rank === 2
      ? "var(--rank2-bg)"
      : rank === 3
      ? "var(--rank3-bg)"
      : "var(--rank4-bg)";

  const border =
    rank === 1
      ? "var(--rank1-border)"
      : rank === 2
      ? "var(--rank2-border)"
      : rank === 3
      ? "var(--rank3-border)"
      : "var(--rank4-border)";

  const rankBg =
    rank === 1
      ? "var(--rank1-rank-bg)"
      : rank === 2
      ? "var(--rank2-rank-bg)"
      : rank === 3
      ? "var(--rank3-rank-bg)"
      : "var(--rank4-rank-bg)";

  const rankColor =
    rank === 1
      ? "var(--rank1-rank-color)"
      : rank === 2
      ? "var(--rank2-rank-color)"
      : rank === 3
      ? "var(--rank3-rank-color)"
      : "var(--rank4-rank-color)";

  const rankLabel =
    rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th";
    const rankImage=rank===1?"./first-icon.svg":rank===2?"./second-icon.svg":rank===3?"./third-icon.svg":""

  return (
    <div
      className="w-64 rounded-3xl p-[1.5px]" 
      style={{
        background: border,
      }}
    >
      
      <div
        className="rounded-3xl p-4 flex flex-col items-center"
        style={{
          background: bg,
        }}
      >
        
        <div className="relative">
          <Avatar className="w-20 h-20 border-2 border-[var(--q3-stroke-light)] shadow">
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="user" />
            ) : (
              <img src="./user-icon.png" className="w-full h-full object-cover" alt="default user" />
            )}
          </Avatar>

          
          <div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{
              // background: rankBg,
              // color: rankColor,
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "50%",
              width: 32,
              height: 32,
              // border: "2px solid white",
              // boxShadow: "0 2px 6px 0 rgba(0,0,0,0.1)",
            }}
          > 
            <img src={rankImage} />
          </div>
        </div>

        
        <h2 className="mt-7 text-lg font-bold text-center text-[var(--q3-neutral-default)]">{name}</h2>

        
        <span
          className="mt-2 text-sm font-medium"
          style={{
            background: rankBg,
            color: rankColor,
            borderRadius: 16,
            padding: "3px 16px",
            display: "inline-block",
            marginBottom: 4,
          }}
        >
          {rank}
          <sup>{rankLabel}</sup> Rank
        </span>

        
        <div className="mt-4 text-sm w-full space-y-2 font-medium text-[var(--q3-neutral-light)]">
          <div className="flex justify-between ">
            <span className="flex items-center gap-1 text-[var(--q3-neutral-light)]">
              <Checks size={18} color="var(--q3-neutral-default)" /> Overall Score
            </span>
            <span className="font-bold text-[var(--q3-neutral-default)] text-lg">
              {overall}
              <span className="text-[var(--q3-neutral-light)] text-base font-normal"> / {maxScore}</span>
            </span>
          </div>

          <div className="flex justify-between ">
            <span className="flex items-center gap-1 text-[var(--q3-neutral-light)]">
              <Atom size={16} color="#009966" /> Phy Score
            </span>
            <span className="font-medium">{physics}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-[var(--q3-neutral-light)]">
              <Flask size={16} color="#F54A00" /> Chem Score
            </span>
            <span className="font-medium">{chemistry}</span>
          </div>

          <div className="flex justify-between ">
            <span className="flex items-center gap-1 text-[var(--q3-neutral-light)]">
              <MathOperations size={16} color="#155DFC" /> Maths Score
            </span>
            <span className="font-medium">{maths}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-[var(--q3-neutral-light)]">
              <Target size={16} color="#C800DE" /> Accuracy
            </span>
             <span className="font-medium">{Number.isInteger(accuracy) 
            ? accuracy 
            : accuracy.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
