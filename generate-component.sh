#!/usr/bin/env bash

mkdir ${1^};
cd ${1^};
npm init -y;
npm install --save-dev webpack webpack-cli css-loader extract-loader html-loader raw-loader uglifyjs-webpack-plugin;
mkdir src;
mkdir dist;
touch src/style.css;

echo "<p>${1^} works!</p>" > src/index.html;

echo "import css from './style.css';
import html from './index.html';

class ${1^} extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = \`<style>\${css}</style>\${html}\`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
    }
}
customElements.define('kg-$1', ${1^});
" > src/index.js;

echo "module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'raw-loader',
                    'extract-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    attributes: false,
                },
            },
        ],
    },
};" > webpack.config.js;