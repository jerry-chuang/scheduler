import React from "react";

import "components/Button.scss";
import classNames from 'classnames/bind';

export default function Button(props) {
   
   const {confirm, danger, onClick, disabled, children} = props;
   let buttonClass = classNames("button",{'button--confirm': confirm, 'button--danger': danger})

   return <button className={buttonClass} onClick={onClick} disabled={disabled}>{children}</button>;
}
