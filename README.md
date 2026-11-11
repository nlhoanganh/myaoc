# AoC Code Editor

An online code editor built for solving [Advent of Code](https://adventofcode.com/) puzzles. Paste your puzzle input, write your solution, and run it — all in the browser.

## Features

- **Monaco Editor** — VSCode-quality editing with syntax highlighting, minimap, and smooth cursor
- **Java auto-import** — type a class name and get `import` statements inserted automatically (48 stdlib classes covered)
- **Puzzle input tab** — paste large input files directly in the UI; sent as stdin on run
- **Live execution** — code runs on [Judge0 CE](https://ce.judge0.com/), results appear in Output/Errors tabs
- **Resizable panels** — drag the divider between editor and output
- **Dark / light theme** — toggle in the header
- **Font size control** — adjust editor font size from the header

## Tech stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | SCSS + CSS custom properties |
| Editor | `@monaco-editor/react` (Monaco) |
| State | Zustand |
| Execution | Judge0 CE public API |
| Layout | `react-resizable-panels` |
| Notifications | `sonner` |

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Running code

1. Write your solution in the editor (class must be named `Main`)
2. Paste your puzzle input in the **Input** tab on the right
3. Click **▶ Run**

Read input in Java with:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            // process line
        }
    }
}
```

## Adding a language

Add one entry to `src/config/languages.ts`:

```ts
{
  id: 'python',
  name: 'Python',
  monacoLanguage: 'python',
  judge0Id: 71,          // Judge0 language ID
  fileExtension: '.py',
  defaultCode: `print("Hello, World!")`,
}
```

The language selector and execution wiring update automatically.
