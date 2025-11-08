
export default function AvailabilityLegend() {
  return (
    <div className="flex gap-2 items-center text-xs">
      <span className="badge bg-green-200">Available</span>
      <span className="badge bg-red-200">Taken</span>
    </div>
  );
}
