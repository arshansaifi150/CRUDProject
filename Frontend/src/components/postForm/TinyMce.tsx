//@ts-nocheck
import { useState, useCallback, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMce({ data, value }) {
  const [editorData, setEditorData] = useState(value || '<p>This is the initial content of the editor.</p>');
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorData(value);
  }, [value]);

  const handleEditorChange = useCallback((content) => {
    setEditorData(content);
    data(content);
  }, [data]);

  const handleKeyUp = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setEditorData(content);
      data(content);
    }
  }, [data]);

  return (
    <Editor
      onInit={(_evt, editor) => editorRef.current = editor}
      tinymceScriptSrc='/tinymce/tinymce.min.js'
      licenseKey='gpl'
      value={editorData}
      onEditorChange={handleEditorChange}
      onKeyUp={handleKeyUp}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; h1{font-size:32px},h2{font-size:20px} }'
        // style_formats: [
        //   { title: 'Heading 1', format: 'h1', classes: 'text-2xl font-bold' },
        //   { title: 'Heading 2', format: 'h2', classes: 'text-3xl font-semibold' },
        //   { title: 'Heading 3', format: 'h3', classes: 'text-2xl font-medium' },
        //   { title: 'Heading 4', format: 'h4', classes: 'text-xl font-medium' },
        //   { title: 'Heading 5', format: 'h5', classes: 'text-lg font-medium' },
        //   { title: 'Heading 6', format: 'h6', classes: 'text-base font-medium' },
        // ],
        // style_formats_merge: false,
      }}
    />
  );
}