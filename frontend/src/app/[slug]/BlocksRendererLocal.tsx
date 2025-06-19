"use client";

import { BlocksContent } from "@strapi/blocks-react-renderer";
import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const BlocksRendererLocal = ({ content }: { content: BlocksContent }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className={`leading-8`}>{children}</p>,
        list: ({ children, format }) => (
          <ul
            className={`${
              format === "ordered" ? "list-decimal" : "list-disc"
            } pl-6`}
          >
            {children}
          </ul>
        ),
        link: ({ url, children }) => (
          <a href={url} className="text-blue-600">
            {children}
          </a>
        ),
      }}
    />
  );
};

export default BlocksRendererLocal;
