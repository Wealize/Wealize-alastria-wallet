## Installation

```bash
yarn install
```

## Run in development

### Run app in android

```bash
yarn android
```

### Run app in iOS

```bash
yarn ios
```

### Run Jest tests

```bash
yarn test
```

### Generate Android release app

#### To generate AAB (recommended way to upload apps to Google Play)

```bash
cd android
./gradlew bundleRelease
```

The app can be found in
or

```bash
android/app/build/outputs/bundle/release/app-release.aab
```

#### To generate APK

```bash
cd android
./gradlew assembleRelease
```

The app can be found in
or

```bash
android/app/build/outputs/apk/release/app-release.apk
```
