import styles from "./Layout.module.css"

function Header() {
    return (
        <div className={styles.header}>
            <span>Ступин Тимур</span>
            <span>P3208</span>
            <span>Вариант: 5454</span>
        </div>
    );
}

export default Header;