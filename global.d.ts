// globals.d.ts
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      html: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHtmlElement>,
        HTMLHtmlElement
      >;
      body: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLBodyElement>,
        HTMLBodyElement
      >;
      div: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >;
      p: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>,HTMLSpanElement>;
    }
  }
}
