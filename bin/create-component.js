#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
//获取命令行参数
const componentName = process.argv[2];
if (!componentName) {
    console.error('Please provide a component name.');
    process.exit(1);
}
// 转换为 PascalCase（如果输入是 kebab-case）
const pascalCaseName = componentName
    .split('-')

    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))

    .join('');
//模板内容
const componentTemplate = `<template>
  <div class="${pascalCaseName.toLowerCase()}">
    
  </div>
</template>
<script>
export default {
  name: '${pascalCaseName}'
}
</script>
<style lang="scss" scoped>
.${pascalCaseName.toLowerCase()} {
  display: block;
}
</style>`  
//写入文件
const outputDir = path.join(process.cwd(), 'src', 'components', pascalCaseName);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(path.join(outputDir, `${pascalCaseName}.vue`), componentTemplate);
console.log(`Component ${pascalCaseName} created successfully.`);