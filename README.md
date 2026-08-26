# OpenIM React Native Demo

This branch runs the OpenIM demo with Expo SDK 57 and React Native 0.86.2. It uses Expo Continuous Native Generation (CNG), so `ios/` and `android/` are generated from `app.json` and are not committed.

## Runtime versions

- Expo SDK `57.0.x`
- React Native `0.86.2`
- React `19.2.3`
- OpenIM React Native SDK `3.8.3-patch.12.4`
- Node.js `22.13.0` or newer

The OpenIM SDK contains native Android and iOS code. Standard Expo Go does not include that module, so this app must run in an Expo development build.

## Install

```sh
npm install
cp .env.example .env.local
```

Update `.env.local` if the OpenIM services are not running on the same host. Android emulators normally use `10.0.2.2` instead of `127.0.0.1` to reach services running on the development machine.

## Run locally

Build and install the development client for the selected platform:

```sh
npm run ios
# or
npm run android
```

After the native development client is installed, start Metro with:

```sh
npm start
```

When native dependencies or `app.json` change, regenerate the native projects before rebuilding:

```sh
npm run prebuild:clean
```

The generated `ios/` and `android/` directories are intentionally ignored. Native configuration belongs in `app.json` or an Expo config plugin so it survives regeneration.

## EAS development builds

`eas.json` includes development profiles for devices and the iOS simulator. Link the project to an Expo account once, then build with:

```sh
npx eas-cli@latest init
npx eas-cli@latest build --profile development --platform android
npx eas-cli@latest build --profile development --platform ios
```

Use the `development-simulator` profile for an iOS Simulator build.

## Validation

```sh
npx expo-doctor@latest
npm run typecheck
npm run lint
npm test -- --runInBand
```

For release deployments, configure HTTPS/WSS OpenIM endpoints and remove the Android cleartext-traffic allowance from the `expo-build-properties` entry in `app.json`.
