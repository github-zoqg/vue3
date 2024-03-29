module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    // '@vue/standard'
    "eslint:recommended", // eslint的建议规则，参考：https://eslint.bootcss.com/docs/rules/
    // 是@vue/eslint-config-prettier的简写, 告诉eslint把prettier规则做为拓展引用到我们自己的项目中来
    "@vue/prettier",
  ],
  rules: {
    "no-debugger": "off",
    "no-unused-vars": "warn",
    "vue/no-unused-components": "warn",
    "vue/no-multiple-template-root": 0,
    "vue/no-unused-vars": "off",
    // "prettier/prettier": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  globals: {
    particlesJS: true,
  },
};
