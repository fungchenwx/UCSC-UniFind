export default function SummaryBox({ summary }) {
  if (!summary) return null;

  return (
    <div className="card mt-3">
      <div className="card-header">AI Summary</div>
      <p>{summary}</p>
    </div>
  );
}
