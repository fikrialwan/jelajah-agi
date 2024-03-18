import { Card, CardContent } from "../../ui/card";

const data = [
  { teamName: "Team 1", score: "100" },
  { teamName: "Team 2", score: "100" },
  { teamName: "Team 3", score: "100" },
  { teamName: "Team 4", score: "100" },
];

const CardBoard = (props: {
  teamName: string;
  score: string;
  index: number;
}) => {
  const { teamName, score, index } = props;
  return (
    <Card className="my-3">
      <CardContent
        className={`flex justify-between items-center p-5 rounded-sm font-bold
      ${
        index === 0
          ? "bg-[#d4af37] bg-gradi"
          : index === 1
          ? "bg-[#c0c0c0]"
          : index === 2
          ? "bg-[#CD7F32]"
          : ""
      }`}
      >
        <span>{teamName}</span>
        <span>{score}</span>
      </CardContent>
    </Card>
  );
};

const LeaderboardList = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h1 className="font-semibold text-2xl">Leaderboard</h1>
      </div>
      {data.map((item, index) => {
        return (
          <CardBoard
            score={item.score}
            teamName={item.teamName}
            key={index}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default LeaderboardList;
