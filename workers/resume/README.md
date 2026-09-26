# Resume Worker

Serves the current `resume.pdf` from the **private** R2 bucket `resume` at `https://srivastava.dev/resume`. This is a separate path-specific Worker, so deploying the website does not replace it. There is no public R2 URL or `workers.dev` URL, and the response is not cached.

To replace the PDF, upload to the **same key**, without adding the file to this public Git repository:

```sh
CLOUDFLARE_ACCOUNT_ID=36c74867d327a67156eddf58aaf5526c \
  bunx wrangler r2 object put resume/resume.pdf \
  --file=/path/to/your/resume.pdf --content-type=application/pdf \
  --cache-control=no-store --remote
```

Then check `https://srivastava.dev/resume`. Anyone who already downloaded an older public PDF may still have their own copy; this setup only prevents old versions from being served by your site or stored in public Git history.

Run `node --test workers/resume/test.mjs` from the repository root to test the Worker logic. Deploy it from the repository root with `CLOUDFLARE_ACCOUNT_ID=36c74867d327a67156eddf58aaf5526c bunx wrangler deploy --config workers/resume/wrangler.jsonc --keep-vars`.
