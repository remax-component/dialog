import React, { FC, ReactNode } from "react";
import { View, ViewProps } from "remax/one";
import clsx from "clsx";

export interface LazyRenderBoxProps extends ViewProps {
  className?: string;
  visible?: boolean;
  hiddenClassName?: string;
  style?: object;
  children?: ReactNode;
}

const LazyRenderBox: FC<LazyRenderBoxProps> = ({
  className,
  visible,
  hiddenClassName = "",
  ...restProps
}) => {
  return (
    <View
      className={clsx(className, {
        [hiddenClassName]: !visible && hiddenClassName,
      })}
      {...restProps}
    />
  );
};

export default React.memo(LazyRenderBox, (prevProps, currentProps) => {
  return !(!!currentProps.hiddenClassName || !!currentProps.visible);
});
