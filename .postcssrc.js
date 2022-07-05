module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      // 这里的值是根据设计稿的数据除以10
      rootValue: (arg) => {
        // vant组件设置的默认值为37.5 要进行判断
        return arg.file.includes("vant") ? "37.5" : "75";
      },
      propList: ["*"],
    },
  },
};
