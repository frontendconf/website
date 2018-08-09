module.exports = {
  "extends":  ["standard", "plugin:react/recommended"],
  "plugins": [
    "standard",
    "promise",
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/jsx-no-target-blank": 0,
    "react/no-deprecated": 0
  }
}
