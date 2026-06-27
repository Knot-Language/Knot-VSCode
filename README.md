# Knot Language Support for VS Code

![logo](logo.svg)

Syntax highlighting and Language Server Protocol support for the [Knot](https://github.com/knot-lang/knot) programming language.

## Features

- **Syntax highlighting** — Full tokenization for `.knot` source files:
  - Keywords (`func`, `class`, `enum`, `if`, `match`, `for`, `while`, `import`, etc.)
  - Primitive types (`I8`–`I64`, `U8`–`U64`, `F32`, `F64`, `String`, `Bool`, `Void`, `Any`)
  - String literals (double-quoted with escapes, single-quoted raw, backtick raw)
  - Numeric literals (decimal, hex `0x`, binary `0b`, octal `0o`, float with suffixes)
  - Comments (`//` line, `/* */` block)
  - Operators (`->`, `=>`, `++`, `+=`, `==`, `!=`, `??`, `..`, `::`, etc.)
  - Function / class / enum name highlighting
  - Wrap decorators (`@name`)

- **Language Server Protocol** — Requires a [knot compiler](https://github.com/knot-lang/knot) binary on `PATH`:
  - Real-time diagnostics (parser + semantic analysis errors and warnings)
  - Code completion (keywords and built-in types)
  - Hover information

- **Language configuration** — Bracket matching, auto-closing pairs, comment toggling

## Requirements

A **knot compiler** binary that supports the `lsp` subcommand. Build it from source:

```sh
git clone https://github.com/knot-lang/knot
cd knot
cargo build
```

## Extension Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `knot.lsp.path` | `"knot"` | Path to the knot compiler binary |

Syntax highlighting works without the compiler. The LSP features (diagnostics, completion, hover) require a knot binary that supports `knot lsp`.

## Known Issues

- LSP server restart is disabled; if the compiler crashes, reload the window (`Ctrl+Shift+P` → `Developer: Reload Window`).
- Completion list is currently a static keyword set (not context-aware).

## Release Notes

### 0.0.1

Initial release: syntax highlighting + LSP (diagnostics, completion, hover).
