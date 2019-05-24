import React, { PureComponent } from 'react';
import hljs from 'highlightjs';

export default class extends PureComponent {
    
    state = {
        value: 'Hello, **world**!'
    };

    onChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
        this.props.onChange && this.props.onChange(value);
    }

    getRawMarkup = (value) => {
        hljs.configure({ classPrefix: '' });
        return { __html: hljs.highlight('markdown', value).value };
    }
    render(){
        const {value} = this.state;
        const {rows,placeholder} = this.props;
        return (
            <div className="markide">
                <textarea placeholder={placeholder} spellCheck={false} onKeyDown={this.onkeydown} onChange={this.onChange} defaultValue={value} rows={rows} className="mark-textarea edit-input" />
                <pre className="markide-preview" dangerouslySetInnerHTML={this.getRawMarkup(value)} ></pre>
            </div>
        )
    }
}