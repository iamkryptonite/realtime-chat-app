/* eslint-disable prettier/prettier */

/* eslint-disable eol-last */
import React from 'react';
import TextTemplate from './textTemplate';
import ImageTemplate from './imageTemplate';

const MessageTemplate = (data) => {
    if (data.message.type === 'text'){
        return (
            <TextTemplate message = {data.message} flag = {data.flag}/>
        );
    } else {
        return (
            <ImageTemplate message = {data.message} flag = {data.flag}/>
        );
    }
};
export default MessageTemplate;