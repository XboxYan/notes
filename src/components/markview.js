import React from 'react';
import Remarkable from 'remarkable';
import hljs from 'highlightjs';
import '../mark.css';

export default (props) => {
    const getRawMarkup = (value) => {
        const md = new Remarkable({
            html: true,
            breaks: true,
            typographer: true,
            langPrefix: '',
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        hljs.configure({ classPrefix: '' });
                        return hljs.highlight(lang, str).value;
                    } catch (err) { }
                }

                try {
                    hljs.configure({ classPrefix: '' });
                    return hljs.highlightAuto(str).value;
                } catch (err) { }

                return ''; // use external default escaping
            }
        });
        md.core.ruler.enable([
            'abbr'
        ]);
        md.inline.ruler.enable([
            'footnote_inline',
            'ins',
            'mark',
            'sub',
            'sup'
        ]);
        return { __html: md.render(value) };
    }
    return (
        <div className="preview" dangerouslySetInnerHTML={getRawMarkup(props.value)}></div>
    )
}