# Copilot Instructions

This file contains instructions for GitHub Copilot. The instructions are written in markdown with a YAML front matter header that specifies the description and the files to which the instructions apply.
## The instructions are intended to guide Copilot in generating code that adheres to the project's coding style and conventions.

## Code Style
- Use Next.js conventions and file structure as outlined in the relevant guide in `node_modules/next/dist/docs/`.

- Prefer TypeScript for all new code. If you need to write JavaScript, ensure it follows the same coding style as TypeScript.
- Use Tailwind CSS for styling. Follow the utility-first approach and avoid writing custom CSS unless necessary.

## Naming Conventions
- Components: Pascal Case (e.g., `MyComponent`)
- Functions and variables: camelCase (e.g., `myFunction`, `myVariable`)
- Constants: UPPER_SNAKE_CASE (e.g., `MY_CONSTANT`)

## Code Structure
- Organize components in a `components` directory, with each component in its own folder.
- Place utility functions in a `utils` directory.
- Use a `pages` directory for Next.js page components.
- Keep related files together (e.g., styles, tests) in the same directory as the component or utility function they pertain to. 