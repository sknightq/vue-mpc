module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
    // 'off' = 0
  // 'warn' = 1
  // 'error' = 2
  rules: {
    // 与prettier插件冲突的设置
    'prettier/prettier': [2, { singleQuote: true, semi: false, printWidth: 200 }],

    // 禁止在条件语句中出现赋值操作符
    // https://cn.eslint.org/docs/rules/no-cond-assign
    'no-cond-assign': [2, 'always'],
    // 线上环境禁用console //! custom-modify
    // https://cn.eslint.org/docs/rules/no-console
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 线上环境禁用debugger //! custom-modify
    // https://cn.eslint.org/docs/rules/no-debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止在 function 定义中出现重复的参数
    // https://cn.eslint.org/docs/rules/no-dupe-args
    'no-dupe-args': 2,
    // 禁止在对象字面量中出现重复的键
    // https://cn.eslint.org/docs/rules/no-dupe-keys
    'no-dupe-keys': 2,
    // 禁止重复 case 标签
    // https://cn.eslint.org/docs/rules/no-duplicate-case
    'no-duplicate-case': 2,
    // 线上环境禁止空块语句 //! custom-modify
    // https://cn.eslint.org/docs/rules/no-empty
    'no-empty': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 不禁止不必要的布尔类型转换(默认禁止), 有时会用!!var来获取原变量非boolean的对应boolean值 //! custom-modify
    // https://cn.eslint.org/docs/rules/no-extra-boolean-cast
    'no-extra-boolean-cast': 0,
    // 禁用不必要的分号
    // https://cn.eslint.org/docs/rules/no-extra-semi
    'no-extra-semi': 2,
    // 禁止对 function 声明重新赋值
    // https://cn.eslint.org/docs/rules/no-func-assign
    'no-func-assign': 2,
    // 禁止在嵌套的语句块中出现function 声明，但不禁止变量的声明 //! custom-modify
    // https://cn.eslint.org/docs/rules/no-inner-declarations
    'no-inner-declarations': [2, 'functions'],
    // 禁止不规则的空白
    // https://cn.eslint.org/docs/rules/no-irregular-whitespace
    'no-irregular-whitespace': 0,
    // 禁止将全局对象当作函数进行调用
    // https://cn.eslint.org/docs/rules/no-obj-calls
    'no-obj-calls': 2,
    // 禁止直接使用 Object.prototypes 的内置属性 //! custom-modify 有待测试
    // https://cn.eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 2,
    // 禁止正则表达式字面量中出现多个空格
    // https://cn.eslint.org/docs/rules/no-regex-spaces
    'no-regex-spaces': 2,
    // 禁用稀疏数组
    // https://cn.eslint.org/docs/rules/no-sparse-arrays
    'no-sparse-arrays': 2,
    // 禁止在常规字符串中出现模板字面量占位符语法
    // https://cn.eslint.org/docs/rules/no-template-curly-in-string
    'no-template-curly-in-string': 2,
    // 禁止使用令人困惑的多行表达式
    // https://cn.eslint.org/docs/rules/no-unexpected-multiline
    'no-unexpected-multiline': 2,
    // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    // https://cn.eslint.org/docs/rules/no-unreachable
    'no-unreachable': 2,
    // 禁止对关系运算符的左操作数使用否定操作符
    // https://cn.eslint.org/docs/rules/no-unsafe-negation
    'no-unsafe-negation': 2,
    // 要求调用 isNaN()检查 NaN
    // https://cn.eslint.org/docs/rules/use-isnan
    'use-isnan': 2,
    // 强制使用有效的 JSDoc 注释 (用于代码注释)
    // https://cn.eslint.org/docs/rules/valid-jsdoc
    'valid-jsdoc': 2,
    // 强制 typeof 表达式与有效的字符串进行比较
    // https://cn.eslint.org/docs/rules/valid-typeof
    'valid-typeof': 2,

    // 不强制getter/setter成对出现在对象中 //! custom-modify
    // https://cn.eslint.org/docs/rules/accessor-pairs
    'accessor-pairs': 0,
    // 强制数组方法的回调函数中有 return 语句
    // https://cn.eslint.org/docs/rules/array-callback-return
    'array-callback-return': 2,
    //是否允许非空数组里面有多余的空格
    'array-bracket-spacing': [2, 'never'],
    // 把 var 语句看作是在块级作用域范围之内
    // https://cn.eslint.org/docs/rules/block-scoped-var
    'block-scoped-var': 2,
    // 强制类方法使用 this
    // https://cn.eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': 2,
    // 限制圈复杂度, 条件语句最多10句
    // https://cn.eslint.org/docs/rules/complexity
    complexity: [0, 10],
    // 要求使用一致的 return 语句
    // https://cn.eslint.org/docs/rules/consistent-return
    'consistent-return': 2,
    // 要求遵循大括号约定, 要求一直要有
    // https://cn.eslint.org/docs/rules/curly
    curly: 2,
    // 要求 Switch 语句中有 Default 分支或者写"// NO Default"来规避规则 // ! custom-modify
    // https://cn.eslint.org/docs/rules/default-case
    'default-case': [2, { commentPattern: '/^No Default$/i' }],
    // 不强制在点号之前或之后换行// ! custom-modify
    // https://cn.eslint.org/docs/rules/dot-location
    'dot-location': 0,
    // 要求使用 === 和 !==
    // https://cn.eslint.org/docs/rules/eqeqeq
    eqeqeq: [2, 'always'],
    // 禁止与 null 进行比较
    // https://cn.eslint.org/docs/rules/no-eq-null
    'no-eq-null': 2,
    // 禁止扩展native对象
    // https://cn.eslint.org/docs/rules/no-extend-native
    'no-extend-native': 2,
    //禁止不必要的函数绑定
    'no-extra-bind': 2,
    'no-global-assign': 2,
    //禁用with
    'no-with': 2,
    //禁用void操作符
    'no-void': 2,
    //禁用var，用let和const代替
    'no-var': 0,
    //parseInt必须指定第二个参数
    radix: 2,
    // 引号使用单引号
    quotes: [2, 'single'],
    //对象字面量中的属性名是否强制双引号
    'quote-props': 0,
    //对象字面量中冒号的前后空格
    'key-spacing': [0, { beforeColon: false, afterColon: true }],
    //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-cap': 2,
    //new时必须加小括号
    'new-parens': 2,
    //强制驼峰法命名
    camelcase: 2,
    //逗号风格，换行时在行首还是行尾
    'comma-style': [2, 'last'],
    //禁止或强制在计算属性中使用空格
    'computed-property-spacing': [2, 'never'],
    // 方法名与左括号之间的空格是否开启，例test(),而不是test ()
    'space-before-function-paren': 0,
    // 对于数组和对象末尾不需需要加逗号（有多行和单行）
    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': [
      2,
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ]
  }
};
