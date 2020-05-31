import React, {
  ReactNode,
  useMemo,
  CSSProperties,
  FC,
  useCallback,
  useRef,
  useState,
} from "react";
import { View, ViewProps, TapEvent } from "remax/one";
import { CSSTransition } from "@remax-component/transition-group";
import clsx from "clsx";
import LazyRenderBox from "./LazyRenderBox";

export interface DialogProps {
  prefixCls?: string;
  className?: string;
  wrapClassName?: string;
  zIndex?: number;

  title?: ReactNode;
  footer?: ReactNode;
  bodyStyle?: CSSProperties;

  visible?: boolean;
  onClose?: (e: TapEvent) => unknown;
  afterClose?: () => unknown;

  transitionName?: string;
  transitionTimeout?: number;
  maskTransitionName?: string;
  maskTransitionTimeout?: number;

  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  maskProps?: ViewProps;

  style?: CSSProperties;
  wrapProps?: ViewProps;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

const Dialog: FC<DialogProps> = (props) => {
  const {
    className,
    prefixCls = "rmc-dialog",
    wrapClassName,
    style,
    wrapProps = {},

    transitionName,
    transitionTimeout = 0,
    maskTransitionName,
    maskClosable = true,
    afterClose,

    maskProps = {},
    maskStyle = {},
    bodyStyle,
    children,
    footer = null,
    title = null,
    visible = false,
    zIndex,
    onClose = noop,
  } = props;

  const [isFullClosed, setFullClosed] = useState(!visible);

  const prevVisibleRef = useRef<undefined | boolean>(undefined);
  if (prevVisibleRef.current !== visible) {
    prevVisibleRef.current = visible;
    if (visible) {
      setFullClosed(false);
    }
  }

  const maskTransitionTimeout =
    props.maskTransitionTimeout || transitionTimeout || 0;

  const wrapCls = clsx(`${prefixCls}-wrap`, wrapClassName);

  const onMaskTap = useCallback(
    (e: TapEvent) => {
      e.target.dataset?.wrapper === e.currentTarget.dataset?.wrapper &&
        maskClosable &&
        onClose(e);
    },
    [maskClosable, onClose]
  );

  const triggerExitOnMaskExit = maskTransitionTimeout > transitionTimeout;
  const onDialogExited = useCallback(() => {
    if (!triggerExitOnMaskExit) {
      setFullClosed(true);
      afterClose?.();
    }
  }, [triggerExitOnMaskExit, afterClose]);

  const onMaskExited = useCallback(() => {
    if (triggerExitOnMaskExit) {
      setFullClosed(true);
      afterClose?.();
    }
  }, [triggerExitOnMaskExit, afterClose]);

  const maskElement = useMemo(() => {
    const zIndexStyle = zIndex !== undefined ? { zIndex } : {};
    let _maskElement = (
      <LazyRenderBox
        style={{ ...zIndexStyle, ...maskStyle }}
        key="mask-element"
        className={`${prefixCls}-mask`}
        hiddenClassName={`${prefixCls}-mask-hidden`}
        visible={visible}
      />
    );

    if (maskTransitionName) {
      _maskElement = (
        <CSSTransition
          unmountOnExit
          mountOnEnter
          onExited={onMaskExited}
          timeout={maskTransitionTimeout}
          key="mask"
          enter
          in={visible}
          appear
          classNames={maskTransitionName}
        >
          {_maskElement}
        </CSSTransition>
      );
    }
    return _maskElement;
  }, [
    maskTransitionName,
    maskProps,
    maskStyle,
    prefixCls,
    visible,
    zIndex,
    maskTransitionTimeout,
    onMaskExited,
  ]);

  const dialogElement = useMemo(() => {
    return (
      <CSSTransition
        mountOnEnter
        unmountOnExit
        onExited={onDialogExited}
        timeout={transitionTimeout}
        key="dialog"
        in={visible}
        appear
        classNames={transitionName}
      >
        <LazyRenderBox
          key="dialog-element"
          role="document"
          visible={visible}
          className={clsx(prefixCls, className)}
        >
          <View className={`${prefixCls}-content`}>
            {/* Header */}
            {!!title && (
              <View className={`${prefixCls}-header`}>
                <View className={`${prefixCls}-title`}>{title}</View>
              </View>
            )}
            {/* Body */}
            <View className={`${prefixCls}-body`} style={bodyStyle}>
              {children}
            </View>

            {/* Footer */}
            {!!footer && (
              <View className={`${prefixCls}-footer`}>{footer}</View>
            )}
          </View>
        </LazyRenderBox>
      </CSSTransition>
    );
  }, [
    transitionTimeout,
    footer,
    title,
    visible,
    transitionName,
    prefixCls,
    className,
    title,
    bodyStyle,
    children,
  ]);

  if (isFullClosed) {
    return null;
  }

  return (
    <View>
      {maskElement}
      <View
        role="dialog"
        data-wrapper={true}
        onTap={onMaskTap}
        className={wrapCls}
        style={style}
        {...wrapProps}
      >
        {dialogElement}
      </View>
    </View>
  );
};

export default Dialog;
