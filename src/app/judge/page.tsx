import RulerNavbar from "~/lib/components/features/ruler/layout/navbar";
import { ListTeamBooth } from "~/lib/components/pages/judge";

const ListTeamJudgePage = () => {
  return (
    <>
      <RulerNavbar />
      <div className="container pt-8">
        <ListTeamBooth />
      </div>
    </>
  );
};

export default ListTeamJudgePage;
