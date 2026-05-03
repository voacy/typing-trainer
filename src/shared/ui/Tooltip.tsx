import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import "./Tooltip.scss";

type Props = {
	content: ReactNode;
	children: ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	delay?: number;
};

const Tooltip = ({ content, children, side = "bottom", delay = 400 }: Props) => {
	return (
		<RadixTooltip.Root delayDuration={delay}>
			<RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
			<RadixTooltip.Portal>
				<RadixTooltip.Content className="tooltip" side={side} sideOffset={6}>
					{content}
					<RadixTooltip.Arrow className="tooltip__arrow" />
				</RadixTooltip.Content>
			</RadixTooltip.Portal>
		</RadixTooltip.Root>
	);
};

export const TooltipProvider = RadixTooltip.Provider;
export default Tooltip;
