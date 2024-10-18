function ScoreInfo({
  score,
  label,
  isHighlighted,
}: {
  score: string;
  label: string;
  isHighlighted?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between items-center max-[700px]:col-span-6">
      <p className={`text-2xl ${isHighlighted ? "text-[#3050EB]" : ""}`}>
        {score}
      </p>
      <p className="mb-[0.4rem]">{label}</p>
    </div>
  );
}

export default ScoreInfo;
