// yarn add @zeit/next-css
// 新建 next.config.js 配置以下内容
// 这样我们的Next.js就支持CSS文件了。

const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

module.exports = withCss({})

