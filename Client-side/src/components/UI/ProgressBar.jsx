import * as React from "react";
import * as Progress from "@radix-ui/react-progress";

const ProgressBar = ({progress}) => {

	return (
		<Progress.Root  className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200" value={progress}>
			<Progress.Indicator
				className="h-full bg-blue-600 transition-transform duration-300"
				style={{ transform: `translateX(-${100 - progress}%)` }}
			/>
		</Progress.Root>
	);
};

export default ProgressBar;