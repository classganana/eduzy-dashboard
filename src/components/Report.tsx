import ReportsCard from "@/components/reportCard";
type Props = {};
const Reports = (_props: Props) => {
  return (
    <div className="flex flex-row items-center gap-3 flex-wrap">
      <ReportsCard
        InfoText="4 Tests completed as of today."
        Percentage="78%"
        Title="Overall score"
      />
      <ReportsCard
        InfoText="Average data of 27 students"
        Percentage="92%"
        Title="Average test completion rate"
      />
      <ReportsCard
        InfoText="Average data of 27 students"
        Percentage="2.3 Days"
        Title="Average completion time"
      />
    </div>
  );
};

export default Reports;
