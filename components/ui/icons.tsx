import React from "react";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";

type IconProps = Partial<GetProps<typeof Icon>>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PlaneSvg = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const BriefcaseSvg = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

export const PlaneIcon = (props: IconProps) => (
  <Icon component={PlaneSvg} {...props} />
);

export const BriefcaseIcon = (props: IconProps) => (
  <Icon component={BriefcaseSvg} {...props} />
);
