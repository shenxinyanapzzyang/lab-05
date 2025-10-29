const fs = require('fs');
const path = require('path');

// 读取package.json文件
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 检查build脚本
console.log('当前build脚本:', packageJson.scripts.build);
console.log('是否包含vue-tsc:', packageJson.scripts.build.includes('vue-tsc'));
console.log('是否仅为vite build:', packageJson.scripts.build === 'vite build');

// 检查是否存在type-check脚本
console.log('是否存在type-check脚本:', 'type-check' in packageJson.scripts);
if ('type-check' in packageJson.scripts) {
  console.log('type-check脚本内容:', packageJson.scripts['type-check']);
}