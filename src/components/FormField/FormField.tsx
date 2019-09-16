import React, { HTMLAttributes, ReactNode } from 'react';
import getClassName from '../../helpers/getClassName';
import classNames from '../../lib/classNames';
import usePlatform from '../../hooks/usePlatform';
import { HasChildren, HasRootRef } from '../../types/props';

export interface FormFieldProps extends HTMLAttributes<HTMLElement>, HasRootRef<HTMLElement>, HasChildren {
  TagName?: string,
  top?: ReactNode,
  bottom?: ReactNode,
  /**
   * Значение `verified` устарело и будет удалено в 3.0.0. Используйте вместо него `valid`
   */
  status?: 'default' | 'error' | 'valid' | 'verified'
}

const FormField: React.FunctionComponent<FormFieldProps> = ({
  TagName,
  className,
  children,
  status,
  getRootRef,
  ...restProps
}: FormFieldProps) => {
  const platform = usePlatform();
  // Не используем тут JSX из-за этой проблемы: https://github.com/Microsoft/TypeScript/issues/28892
  return React.createElement(TagName, {
    ...restProps,
    ref: getRootRef,
    className: classNames(getClassName('FormField', platform), {
      [`FormField--s-${status}`]: status !== 'default'
    }, className)
  }, <React.Fragment>{children}<div className="FormField__border" /></React.Fragment>);
};

FormField.defaultProps = {
  status: 'default',
  TagName: 'div'
};

export default FormField;
