import React from 'react'
import BlogEditor from './Blog'
import { useState } from 'react';

export default function Container() {
  const [blogContent, setBlogContent] = useState(
    "<p>Start writing your blog...</p>",
  );

  return (
    <div>
      <BlogEditor
        content={blogContent}
        onChange={(newContent) => setBlogContent(newContent)}
      />
    </div>
  );
}
