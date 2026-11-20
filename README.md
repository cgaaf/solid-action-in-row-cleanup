# A removed row's cleanup that calls an action throws in development (solid-js 2.0.3)

```sh
npm install
npm start       # development: node --conditions=browser --conditions=development repro.mjs
npm run prod    # production:  node --conditions=browser repro.mjs
```

Both conditions are needed for development: without `browser`, `solid-js` resolves to its server build.

Development prints:

```
write:  count = 1
action: flush() threw [ACTION_CALLED_IN_OWNED_SCOPE] Calling an action inside an o…
action: acted = 0
```

Production prints:

```
write:  count = 1
action: acted = 1
```
