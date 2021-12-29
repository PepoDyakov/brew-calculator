import React, { useEffect, useContext } from "react";
import Logo from "./assets/logo.png";
import About from "./pages/About";
import Home from "./pages/Home";
import { pagesMapping, RoutingContext } from "./routing";

import styles from "./styles/App.module.css";

const App = () => {
  const { page, setPage } = useContext(RoutingContext);

  useEffect(() => {
    setPage(pagesMapping.home);
  });

  return (
    <div className={styles.app}>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <img
            src={Logo}
            alt="Brewculator Logo"
            className={styles.logo}
            onClick={() => setPage(pagesMapping.home)}
          />
          <nav className={styles.nav}>
            <p
              className={styles.pageLink}
              onClick={() => setPage(pagesMapping.about)}
            >
              about the project
            </p>
          </nav>
        </div>
        {page === pagesMapping.home && <Home />}
        {page === pagesMapping.about && <About />}
        <div className={styles.footerWrapper}>
          <p className={styles.footerCopy}>brewculator web</p>
          <p className={styles.footerCopy}>made by petar and alexander</p>
        </div>
      </div>
    </div>
  );
};

export default App;
