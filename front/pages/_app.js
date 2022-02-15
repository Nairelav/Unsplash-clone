import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
      <SiteFooter />
    </>
  );
}

export default MyApp;
