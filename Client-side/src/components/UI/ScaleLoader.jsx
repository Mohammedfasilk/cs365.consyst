import { ScaleLoader } from "react-spinners";

function ScaleLoading({
  loading = true,
  size = 100,
  color = "#2563EB",
  className = "",
}) {
  const height = size * 0.4; // default 40 when size=100
  const width = size * 0.06; // default 6 when size=100
  const margin = size * 0.04; // default 4 when size=100
  const radius = size * 0.02; // default 2 when size=100

  return (
    <div className={`flex justify-center items-center w-full h-full ${className}`}>
      <ScaleLoader
        loading={loading}
        height={height}
        width={width}
        margin={margin}
        radius={radius}
        color={color}
      />
    </div>
  );
}

export default ScaleLoading;