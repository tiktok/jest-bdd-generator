---
id: testOracle
title: Managing Examples with Test Oracle
---

# Managing Test Examples with Test Oracle

For more information about test oracles, you can visit [Test Oracle on Wikipedia](https://en.wikipedia.org/wiki/Test_oracle).

## `Examples` and Combinations of All Options
The combinations of all possible options in test examples form what’s known as a **Cartesian product**. This mathematical concept can result in thousands of combinations. The goal of this Web UI is to handle these combinations efficiently for you.

## Explore It with Our Demo:
The [index page](/oracleNumber) features a table of various `Math.round` methods:
  - Click **run** in the top-left corner to generate and view the expected results.
  - Click **copy** to copy the table data and use it in your `.feature` files.

### Working with Selections:
You can easily copy selected data from the table:
  - Drag and select individual cells, or drag across column headers to select and copy entire columns.
  - The selected data can be pasted directly into your Gherkin files.

### Editing Expressions:
You can edit the expressions for both rows (e.g., `9.1`, `-9.1`) and columns (`"ceil"`, `"floor"`):
  - Click the header of any row or column to modify the expression.
  - Any changes you make will be reflected in the URL hash, so you can track and share updates.

You can also edit **row headers** (e.g., `num`, `note`) by clicking on the top of the row expression. The selected column will appear in the **Input box**, and the **paste box** supports multiline data separated by `\n` or `\r\n`.

### Using the Test Oracle Component
Here’s an example of how to integrate the **TestOracle** component into your code:

```tsx
<TestOracle 
  colSelections={colSelections} // Editor configuration of expressions
  defaultCols={defaultCols} // Default columns
  defaultRows={defaultRows} // Default rows
  execute={execute} // Function that processes the combined expression
/>
```

### A More Complex Demo
You can explore a more advanced example of Test Oracle with the [Intl Plural Rule demo](/oracleIntl).
