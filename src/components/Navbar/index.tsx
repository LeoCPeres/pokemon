import styles from "./styles.module.scss";

export function Navbar() {
  return (
    <div className={styles.containerNavbar}>
      <a href="/"><img src="/logo.png" alt="" /></a>

      {/*navbar com mais itens para um futuro projeto*/}
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Pokédex</a>
          </li>
          <li>
            <a href="/">Legendaries</a>
          </li>
          <li>
            <a href="/">Documentation</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
