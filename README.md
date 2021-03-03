
## Setup

Use npm as yarn has some problems with capacitor comunity electron


```
vue create .
# TS, PWA, Router, Linter, Use babel, Use history, Basic linter, Dedicated

npm install -D @nuxtjs/tailwindcss tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
npx tailwindcss init
npm i -D @capacitor/core @capacitor/cli
npx cap init test test.antyprojekt.pl --web-dir=dist
```

## Build android
setup

```
npx cap add android
```

run

```
npx cap copy
# requires android studio
npx cap open android
```


## Build electron

Setup

```
npm i -D @capacitor-community/electron
npm run build
npx cap add @capacitor-community/electron

```

Run

```
npx cap copy
npx cap open @capacitor-community/electron
```

## Build web


```
npx cap copy
npx cap serve
```
