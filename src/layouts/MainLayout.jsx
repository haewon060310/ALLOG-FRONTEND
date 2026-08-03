function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <a className="app-logo" href="/">
          ALLLOG
        </a>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}

export default MainLayout;
