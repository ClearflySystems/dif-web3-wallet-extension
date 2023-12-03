{
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        // Your SWC config as there seems to be an issue with @swc/jest
        // to pick up the .swcrc config file.
        // https://github.com/swc-project/swc-node/issues/635#issuecomment-1070766669
      }
    ]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"]
}