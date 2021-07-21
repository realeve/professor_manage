import React, { useState, useEffect } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import { Button,message } from 'antd';


function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
export default function Docx({
  data,
  filename = '专家签字表',
  modelName = '/doc/1.专家签字表.docx',
}: {
  modelName?: string;
  filename?: string;
  data: any;
}) {
  const [content, setContent] = useState(null);
  useEffect(() => {
    loadFile(modelName, function (error, content) {
      if (error) {
        message.error(`读取 ${filename} 模板文件发生错误，请稍候重试`)
        throw error;
      }
      setContent(content);
    });
  }, []);

  const generateDocument = () => {

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(data);
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (error, key) {
            error[key] = value[key];
            return error;
          }, {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join('\n');
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this:
        // 'The tag beginning with "foobar" is unopened'
      }
      message.error(`${filename} 文件构建发生错误，请稍候重试`)
      throw error;
    }
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }); //Output the document using Data-URI
    saveAs(out, `${filename}.docx`);
  };

  return <Button onClick={generateDocument}>导出{filename}</Button>;
}
