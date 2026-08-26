<p align="center">
    <a href="https://www.openim.online">
        <img src="./docs/images/openim-logo.gif" width="60%" height="30%"/>
    </a>
</p>

# OpenIM React Native Demo 💬💻

<p>
  <a href="https://docs.openim.io/">OpenIM Docs</a>
  •
  <a href="https://github.com/openimsdk/open-im-server">OpenIM Server</a>
  •
  <a href="https://github.com/openimsdk/openim-sdk-core">openim-sdk-core</a>
  •
  <a href="https://github.com/openimsdk/open-im-sdk-reactnative">open-im-sdk-reactnative</a>
</p>

<br>

OpenIM React Native Demo is an open-source instant messaging application built on OpenIM SDK React Native, OpenIM Server, React Native, and Expo. It demonstrates how to integrate OpenIM into a mobile app with an Expo development build.

## Tech Stack 🛠️

- [Expo SDK 57](https://expo.dev/changelog/sdk-57)
- [React Native 0.86.2](https://reactnative.dev/)
- [OpenIM React Native SDK](https://github.com/openimsdk/open-im-sdk-reactnative)
- Expo Continuous Native Generation (CNG)

## Dev Setup 🛠️

> Use Node.js 20.19.4+, 22.13.0+, or 24.3.0+. OpenIM contains native code, so this app requires an Expo development build and does not run in Expo Go.

Native toolchain requirements:

- iOS: Xcode 26.4 or newer.
- Android: Android Studio with JDK 21 and Android SDK 36.

Follow these steps to set up a local development environment:

1. Enable Corepack and install dependencies:

   ```sh
   corepack enable
   yarn install
   ```

2. Modify the request address to your own OpenIM Server IP in the following files:
   > Note: You need to [deploy](https://docs.openim.io/guides/gettingStarted/dockerCompose) OpenIM Server first, the default port of OpenIM Server is 10001, 10002, 10008.
   - `src/config/index.ts`

     ```js
     export const WS_URL = "ws://your-server-ip:10001";
     export const API_URL = "http://your-server-ip:10002";
     export const USER_URL = "http://your-server-ip:10008";
     ```
3. Generate and run a native development build:

   ```sh
   yarn android
   # or
   yarn ios
   ```

   `expo run:*` generates `android/` or `ios/` automatically on first run. These generated directories are intentionally not committed.

4. After the development build is installed, start Metro with:

   ```sh
   yarn start
   ```

5. If native dependencies or app configuration change, regenerate native projects with `yarn prebuild:clean` and rebuild the development client.

## Community :busts_in_silhouette:

- 📚 [OpenIM Community](https://github.com/OpenIMSDK/community)
- 💕 [OpenIM Interest Group](https://github.com/Openim-sigs)
- 🚀 [Join our Slack community](https://join.slack.com/t/openimsdk/shared_invite/zt-2ijy1ys1f-O0aEDCr7ExRZ7mwsHAVg9A)
- :eyes: [Join our wechat (微信群)](https://openim-1253691595.cos.ap-nanjing.myqcloud.com/WechatIMG20.jpeg)

## Community Meetings :calendar:

We want anyone to get involved in our community and contributing code, we offer gifts and rewards, and we welcome you to join us every Thursday night.

Our conference is in the [OpenIM Slack](https://join.slack.com/t/openimsdk/shared_invite/zt-2ijy1ys1f-O0aEDCr7ExRZ7mwsHAVg9A) 🎯, then you can search the Open-IM-Server pipeline to join

We take notes of each [biweekly meeting](https://github.com/orgs/OpenIMSDK/discussions/categories/meeting) in [GitHub discussions](https://github.com/openimsdk/open-im-server/discussions/categories/meeting), Our historical meeting notes, as well as replays of the meetings are available at [Google Docs :bookmark_tabs:](https://docs.google.com/document/d/1nx8MDpuG74NASx081JcCpxPgDITNTpIIos0DS6Vr9GU/edit?usp=sharing).

## Who are using OpenIM :eyes:

Check out our [user case studies](https://github.com/OpenIMSDK/community/blob/main/ADOPTERS.md) page for a list of the project users. Don't hesitate to leave a [📝comment](https://github.com/openimsdk/open-im-server/issues/379) and share your use case.

## License :page_facing_up:

This repository is licensed under the GNU Affero General Public License version 3 (AGPL-3.0) and is subject to the following additional terms. Commercial use is not permitted. Please refer to [here](./LICENSE) for details.
