/**
 * 生成百度链接推送文件
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readFileList = require('./modules/readFileList');
const urlsRoot = path.join(__dirname, '..', 'urls.txt'); // 百度链接推送文件
const DEFAULT_SITE_URL = 'https://xiaoyangdeve.github.io/donot-eat-fish';
const SITE_URL = (process.env.SITE_URL || process.argv[2] || DEFAULT_SITE_URL).replace(/\/$/, '');

main();

/**
 * 主体函数
 */
function main() {
  fs.writeFileSync(urlsRoot, SITE_URL)
  const files = readFileList(); // 读取所有md文件数据

  files.forEach(file => {
    const { data } = matter(fs.readFileSync(file.filePath, 'utf8'));

    if (data.permalink) {
      const link = `\r\n${SITE_URL}${data.permalink}`;
      console.log(link)
      fs.appendFileSync(urlsRoot, link);
    }
  })
}
