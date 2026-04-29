function Header({ title, subtitle }) {
  return (
    <div className="header-block">
      <p className="subtitle">{subtitle}</p>
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
