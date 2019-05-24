import React from 'react';
import { Control } from 'react-keeper';

export default () => (
    <a className="iconfont icon-cancel app-back" onClick={()=>Control.go(-1)}> </a>
)