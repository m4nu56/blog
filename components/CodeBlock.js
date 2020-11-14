import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'

(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-java')
require('prismjs/components/prism-javastacktrace')

import theme from 'prism-react-renderer/themes/palenight'

export default function CodeBlock ({ children, className }) {
  const language = className ? className.replace(/language-/, '') : 'text'
  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', overflowX: 'auto' }}>
                    {tokens.filter((line, i) => i < tokens.length - 1).map((line, i) => (
                      <div key={i} data-key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                </pre>
      )}
    </Highlight>
  )
}
