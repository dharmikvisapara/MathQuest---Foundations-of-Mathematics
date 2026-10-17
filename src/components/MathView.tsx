import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '', block = false }) => {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    // If whole string is designated as block math
    if (block) {
      try {
        return katex.renderToString(content.replace(/^\$\$|\$\$$/g, ''), {
          displayMode: true,
          throwOnError: false,
        });
      } catch {
        return content;
      }
    }

    // Split text by $$...$$ (block) and $...$ (inline)
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    const parts = content.split(regex);

    return parts
      .map((part) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const formula = part.slice(2, -2).trim();
          try {
            return katex.renderToString(formula, { displayMode: true, throwOnError: false });
          } catch {
            return `<span class="text-rose-400">[Math: ${formula}]</span>`;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const formula = part.slice(1, -1).trim();
          try {
            return katex.renderToString(formula, { displayMode: false, throwOnError: false });
          } catch {
            return `<span class="text-rose-400">[Math: ${formula}]</span>`;
          }
        }
        // Escape standard HTML characters for security
        return part
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br/>');
      })
      .join('');
  }, [content, block]);

  return (
    <span
      className={`math-content inline-block leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};
