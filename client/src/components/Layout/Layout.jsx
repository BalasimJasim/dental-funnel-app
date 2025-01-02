import PropTypes from "prop-types";
import config from "../../config";
import styles from "./Layout.module.css";

const Layout = ({ children, isStandalone = true }) => {
  return (
    <div className={styles.layout}>
      {/* Header will be shown when integrated */}
      {!isStandalone && config.integration.showMainHeader && (
        <header className={styles.mainHeader}>
          {/* Main website header will be imported here */}
        </header>
      )}

      {/* Navigation links to main website */}
      {!isStandalone && config.integration.enableMainNav && (
        <nav className={styles.mainNav}>
          <a href={`${config.mainWebsiteUrl}${config.routes.mainWebsite.home}`}>
            Головна
          </a>
          <a
            href={`${config.mainWebsiteUrl}${config.routes.mainWebsite.services}`}
          >
            Послуги
          </a>
          <a
            href={`${config.mainWebsiteUrl}${config.routes.mainWebsite.contacts}`}
          >
            Контакти
          </a>
        </nav>
      )}

      {/* Main content */}
      <main className={styles.main}>{children}</main>

      {/* Footer will be shown when integrated */}
      {!isStandalone && config.integration.showMainFooter && (
        <footer className={styles.mainFooter}>
          {/* Main website footer will be imported here */}
        </footer>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isStandalone: PropTypes.bool,
};

export default Layout;
