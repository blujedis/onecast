module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/jsx-runtime"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": ["warn", { "ignoreRestSiblings": true }],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off"
    }
};
