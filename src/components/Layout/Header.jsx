import styles from "./Layout.module.css"

function Header() {
    return (
        <div className={styles.header}>
            <span>Ступин Тимур</span>
            <span>P3208</span>
            <span>Вариант: XXX</span>
        </div>
    );
}

export default Header;