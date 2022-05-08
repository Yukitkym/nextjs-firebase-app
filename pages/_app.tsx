import { RecoilRoot } from "recoil";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import "../lib/firebase";
import "../styles/globals.scss";

dayjs.locale("ja");

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
