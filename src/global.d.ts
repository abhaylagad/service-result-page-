import * as React from 'react';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'media-id'?: string;
        'aspect'?: string;
      }, HTMLElement>;
    }
  }
}
