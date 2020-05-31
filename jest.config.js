module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(remax|@remax|@remax-component)/)",
  ],

  moduleNameMapper: {
    "@remax/runtime-plugin": "<rootDir>/__mocks__/runtimePlugin.ts",
  },

  globals: {
    __REMAX_HOST_COMPONENTS__: {},
    __REMAX_APP_EVENTS__: [
      "onLaunch",
      "onShow",
      "onHide",
      "onShareAppMessage",
      "onPageNotFound",
      "onError",
      "onUnhandledRejection",
      "onThemeChange",
    ],
    __REMAX_PAGE_EVENTS__: {
      "pages/test/only/onshow": ["onShow"],
      "pages/test/index": [
        "onShow",
        "onHide",
        "onPullDownRefresh",
        "onPullIntercept",
        "onReachBottom",
        "onPageScroll",
        "onShareAppMessage",
        "onTitleClick",
        "onOptionMenuClick",
        "onPopMenuClick",
        "onReady",
        "onResize",
        "onTabItemTap",
      ],
    },
    __REMAX_PX2RPX__: true,
    __REMAX_DEBUG__: false,
    stopPullDownRefresh: () => void 0,
  },
};
