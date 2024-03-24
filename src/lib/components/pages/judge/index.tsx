const CardTeam = (props: { name: string; isValidate: boolean }) => {
  const { name, isValidate } = props;
  return (
    <div className="py-5 px-6 rounded-lg shadow-md border flex justify-between items-center">
      <span>{name}</span>
      <span
        className={`p-2 ${
          isValidate ? "bg-green-600" : "bg-red-600"
        } text-white rounded-xl text-xs`}
      >
        {isValidate ? "Validated" : "Not Validated"}
      </span>
    </div>
  );
};

const data = {
  teams: [
    {
      name: "Team 1",
      isValidate: true,
    },
    {
      name: "Team 2",
      isValidate: false,
    },
  ],
};

const ListTeamBooth = () => {
  return (
    <div>
      {data.teams.map((team, index) => {
        return (
          <div key={index} className="mb-5">
            <CardTeam name={team.name} isValidate={team.isValidate} />
          </div>
        );
      })}
    </div>
  );
};

export { ListTeamBooth };
