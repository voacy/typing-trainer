import useCapsLock from "./useCapsLock";
import { ArrowFatLineUpIcon } from "@phosphor-icons/react";

const CapsLockWarning = () => {
	const isCapsLock = useCapsLock();

	if (!isCapsLock) return null;

	return (
		<span className="capslock-warning">
			<ArrowFatLineUpIcon size={25} />
			Caps Lock
		</span>
	);
};

export default CapsLockWarning;
