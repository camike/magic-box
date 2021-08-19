import React from 'react';
import hljs from 'highlight.js';

interface IProps {
    text: string,
    language: string,
}

class HighLightCode extends React.Component<IProps> {
    render() {
        const text = hljs.highlight(this.props.text, {language: this.props.language}).value;
        return <pre><code dangerouslySetInnerHTML={{__html: text}}></code></pre>
    }
}

export default HighLightCode;
