/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');
const [, , ...argv] = process.argv;
const dirName = argv[0];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run test');
  process.exit(0);
}

let dir = './src/pages/';
fs.mkdirSync(`${dir}${dirName}`);
const init = () => {
  let fileStr = `.main {
    display: flex;
  } 
`;

  // 再注入导出的项
  fs.writeFileSync(`${dir}${dirName}/index.less`, fileStr);

  fileStr = `import React from 'react';
  import styles from './index.less';
  
  export default () => {
    return (
      <div className={styles.main}>
        <div className="card-content">
          <h1 className={styles.title}>${dirName}</h1>
        </div>
      </div>
    );
  };
  `;
  // 最后将图表列表写入
  fs.writeFileSync(`${dir}${dirName}/index.tsx`, fileStr);

  return true;
};

init();

process.exit(0);
