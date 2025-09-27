export async function fetchLeaderboard(page = 1, limit = 10) {
  const res = await fetch(`https://api.quizrr.in/api/hiring/leaderboard?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}
