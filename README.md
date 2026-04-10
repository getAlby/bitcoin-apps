# Bitcoin Apps Directory

Open-source directory of apps, websites, and services that connect to Bitcoin and Lightning wallets.

## Contributing

Contributions are welcome. You can:

1. Open a pull request.
2. Open an issue with your proposed change.
3. Submit suggestions through this form: https://form.jotform.com/232284367043051

## What to contribute

- Add a new app listing.
- Improve an existing app listing (description, links, tags, categories).
- Fix typos or inaccurate metadata.
- Improve visuals or accessibility.

## App data location

Main data files:

- `src/data/apps.json`
- `src/data/apps.ts`
- `src/types/discover.ts`

Filtering and selector logic:

- `src/lib/discover.ts`

Assets:

- `public/images/discover`
- `public/images/icons`

## Pull request guidelines

1. Keep changes scoped and easy to review.
2. Follow existing naming and tagging patterns.
3. Use clear, factual app descriptions.
4. Verify links and metadata before opening the PR.
5. Add context in the PR description (what changed and why).

## Tagging hints

- Use `nwc` when an app supports Nostr Wallet Connect.
- Use `webln` when WebLN applies.
- Use `bitcoin_connect` when Bitcoin Connect applies.
- Add relevant product tags when applicable (`alby_hub`, `alby_extension`, `alby_go`, `alby_account`).

## Reporting issues and ideas

If you do not want to open a PR, create an issue or submit your request via the form:

- https://form.jotform.com/232284367043051
