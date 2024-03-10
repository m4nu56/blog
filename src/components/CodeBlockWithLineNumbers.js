import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";

const CodeBlockWithLineNumbers = ({ children, className }) => {
    const language = className.replace(/language-/, '')
    return <Highlight {...defaultProps} theme={theme} code={children} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{textAlign:'left', margin:'1em 0', padding: '0.5em', overflow: 'scroll'}}>
                {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })} style={{display: 'table-row'}}>
                        <span style={{display: 'table-cell', textAlign: 'right', paddingRight: '1em', userSelect: 'none', opacity: '0.5'}}>{i + 1}</span>
                        <span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </span>
                    </div>
                ))}
            </pre>
        )}
    </Highlight>
}

export default CodeBlockWithLineNumbers;