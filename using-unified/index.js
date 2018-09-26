const unified = require("unified");
const vfile = require("to-vfile");
const report = require("vfile-reporter");
const markdown = require("remark-parse");
const toc = require("remark-toc");
const remark2retext = require("remark-retext");
const english = require("retext-english");
const indefiniteArticle = require("retext-indefinite-article");
const remark2rehype = require("remark-rehype");
const doc = require("rehype-document");
const html = require("rehype-stringify");


const processor = unified()
  .use(markdown)
  .use(
    remark2retext, 
    unified()
      .use(english)
      .use(indefiniteArticle)
  )
  .use(toc)
  .use(remark2rehype)
  .use(doc)
  .use(html);

processor.process(vfile.readSync("readme.md"), (err, file) => {
  if (err) throw err;
  console.error(report(file));
  file.extname = ".html";
  vfile.writeSync(file);
});