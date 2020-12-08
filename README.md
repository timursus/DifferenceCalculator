# Difference calculator
[![Workflow](https://github.com/timursus/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/timursus/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/477e5fd164b0049a52d6/maintainability)](https://codeclimate.com/github/timursus/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/477e5fd164b0049a52d6/test_coverage)](https://codeclimate.com/github/timursus/frontend-project-lvl2/test_coverage)

Compares two configuration files and shows a difference.

 - Supports different data formats: JSON, YAML, INI.

 - Shows a report in plain text, pretty, or json formats.

 - Works as CLI utility or as node.js module.

## Installation
Make sure, that you have [node.js](https://nodejs.org/) v13+ installed first.
```bash
npm install -g @timursus/gendiff
```

## Usage
```
gendiff [options] <filepath1> <filepath2>

Options:
  -h, --help           display help for command
  -V, --version        output the version number
  -f, --format <type>  output format [pretty, plain, json] (default: "pretty")
```

## Demonstrations of use
Comparison of nested structures. Output to 3 formats.

[![asciicast-final](https://asciinema.org/a/LBogEXLNWASfkSZfP6MAB3kHO.svg)](https://asciinema.org/a/LBogEXLNWASfkSZfP6MAB3kHO)

### API
**gendiff (filepath1, filepath2 [, outputFormat = 'json'])**

By default, `gendiff` returns a diff tree in json string
``` javascript
import gendiff from '@timursus/gendiff';

const diff = gendiff(filepath1, filepath2);
```