import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";
import React, { useRef, useState } from "react";
import type { DefaultOptionType } from "antd/es/select";
import type { RefSelectProps } from "antd/es/select";

interface SelectProps extends AntSelectProps {
  className?: string;
}

export const Select: React.FC<SelectProps> & {
  Option: typeof AntSelect.Option;
} = ({ className, onChange, onOpenChange, ...props }) => {
  const selectRef = useRef<RefSelectProps>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (
    value: unknown,
    option?: DefaultOptionType | DefaultOptionType[]
  ) => {
    // Close the dropdown
    setOpen(false);

    // Blur the select to close mobile keyboard
    selectRef.current?.blur();

    onChange?.(value, option);
  };

  const handleOpenChange = (visible: boolean) => {
    setOpen(visible);
    onOpenChange?.(visible);
  };

  return (
    <AntSelect
      ref={selectRef}
      className={className}
      onChange={handleChange}
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
};

Select.Option = AntSelect.Option;
