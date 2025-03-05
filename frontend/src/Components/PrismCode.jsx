import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';

const PrismCode = ({ code, setCode }) => {
    const highlightCode = (code) => Prism.highlight(code, Prism.languages.javascript, 'javascript');

    return (
        <Editor
            value={code}
            onValueChange={setCode} // Ensure prop is used correctly
            highlight={highlightCode}
            padding={10}
            style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                backgroundColor: '#282c34',
                color: '#ffffff',
                borderRadius: '5px',
                minHeight: '100%',
                width: '100%',
                outline: 'none',
                border: 'none',
            }}
        />
    );
};

export default PrismCode;
