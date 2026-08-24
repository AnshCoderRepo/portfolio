# Run Doc — Portfolio (Next.js)

## How to Reproduce Uncommitted Artifacts

- No `.env.local` or other environment files are needed — the project runs with defaults.
- Dependencies are already installed in `node_modules`. To reinstall: `npm install`.

## How to Run the Server

```bash
npm run dev
```

This starts Next.js 16.2.6 (Turbopack) on port 3000 by default.

To use a different port:
```bash
npx next dev -p <port>
```

### Detaching on Windows (PowerShell)

```powershell
(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id
```

### Stopping

The Next.js dev server can be stopped by killing the node process, or by finding it via:
```
.next/dev/logs/next-development.log
```

## Notes

- The project uses Turbopack by default (Next.js 16.2.6).
- There may be a warning about multiple lockfiles — this is benign.
- Port 3000 is the default; if already in use, Next.js will pick the next available port.
