# Releasing

Publishing to the Chrome Web Store is automated via [PlasmoHQ/bpp](https://github.com/PlasmoHQ/bpp). Tag a version → GitHub Actions builds, packages, and uploads.

## One-time setup

The very first upload still has to be **manual** — Chrome only assigns the extension ID after that. Everything after the first upload is automatic.

### 1. First manual upload

1. Easiest: go to the **Actions** tab, open the latest passing **CI** run on `main`, and download the **refine-chrome-mv3-prod** artifact. Unzip → you get `chrome-mv3-prod.zip`. (Locally, `bun run package` works too if your sharp/native deps are set up.)
2. Go to <https://chrome.google.com/webstore/devconsole>
3. Pay the one-time $5 developer fee if you haven't already
4. **New item** → upload the zip → fill in listing details → submit
5. After review, copy your **extension ID** from the listing URL (the `khncfooi…` part)

### 2. Get Chrome Web Store API credentials

Follow Google's [Chrome Web Store Publish API guide](https://developer.chrome.com/docs/webstore/using-api) to get:

- `clientId`
- `clientSecret`
- `refreshToken`

Short version:
1. Create a Google Cloud project, enable the **Chrome Web Store API**
2. Create an **OAuth 2.0 Client ID** (Desktop application)
3. Get a refresh token: run the OAuth flow once using your `clientId`/`clientSecret` with scope `https://www.googleapis.com/auth/chromewebstore` — there are CLI tools like [`chrome-webstore-upload-keys`](https://github.com/fregante/chrome-webstore-upload-keys) that automate this single step

### 3. Store the keys as a GitHub secret

In repo Settings → Secrets and variables → Actions, add a secret named `BPP_KEYS` containing:

```json
{
  "chrome": {
    "clientId": "…apps.googleusercontent.com",
    "clientSecret": "…",
    "refreshToken": "…",
    "extId": "…"
  }
}
```

(One JSON blob — BPP parses it server-side.)

## Releasing a new version

```bash
# 1. Bump version in package.json (semver)
# 2. Commit
git commit -am "Release v1.0.3"
# 3. Tag and push
git tag v1.0.3
git push --tags
```

GitHub Actions fires `Publish to Chrome Web Store`, builds, packages, uploads, and submits for review. Status visible in the **Actions** tab.

## Manual trigger

If you need to push the current `main` without bumping a tag, go to **Actions → Publish to Chrome Web Store → Run workflow**.

## Rolling back

The Chrome Web Store keeps every uploaded version. Open the developer console, pick a previous version, and publish that. No git-side ceremony needed.
