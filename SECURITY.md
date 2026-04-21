# Security Policy

## Supported Versions

The `main` branch is the supported version of this project.

## Reporting A Vulnerability

Please do not open a public issue for a security vulnerability.

Use GitHub's private vulnerability reporting for this repository when available, or contact the maintainer through GitHub. Include:

- A clear description of the issue.
- Steps to reproduce it.
- Any affected routes, files, or dependencies.
- Suggested fixes, if you already have them.

## Secrets And Environment Variables

KeySense does not require environment variables right now. Real `.env*` files are intentionally ignored by git. If a future change needs configuration, add safe placeholder keys to `.env.example` and document them in `README.md`.
