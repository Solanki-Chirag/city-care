module.exports = {
	root: true,
	env: { 
	  browser: true, 
	  es2020: true 
	},
	extends: [
	  "eslint:recommended",
	  "plugin:react/recommended",
	  "plugin:react/jsx-runtime",
	  "plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { 
	  ecmaVersion: "latest", 
	  sourceType: "module" 
	},
	settings: { 
	  react: { 
		version: "18.2" 
	  } 
	},
	plugins: ["react-refresh"],
	rules: {
	  // Disable prop-types requirement in React components
	  "react/prop-types": "off",
	  
	  // Show warnings for unused variables instead of errors
	  "no-unused-vars": "off",
	  
	  // Allow console statements
	  "no-console": "off",
  
	  // Disable mixed spaces and tabs errors
	  "no-mixed-spaces-and-tabs": "off",
  
	  // Disable warnings for unescaped entities in JSX
	  "react/no-unescaped-entities": "off",
	  
	  // Allow warnings for only-export-components, allow constant exports
	  "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
	  
	  // Optional: Warn for debugger instead of error
	  "no-debugger": "warn",
	},
  };
  