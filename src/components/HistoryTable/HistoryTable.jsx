import styles from "./HistoryTable.module.css";
import PropTypes from "prop-types";

function HistoryTable({history}) {
    return (
        <table id="history-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>
                    <span className={styles["lg-view"]}>Попадание</span>
                    <span className={styles["sm-view"]}>🎯</span>
                </th>
                <th>
                    <span className={styles["lg-view"]}>Время запроса</span>
                    <span className={styles["sm-view"]}>🕓</span>
                </th>
                <th>
                    <span className={styles["lg-view"]}>Время выполнения</span>
                    <span className={styles["sm-view"]}>🚀</span>
                </th>
            </tr>
            </thead>
            <tbody>
            {history.map((entry, index) => (
                <tr key={index}>
                    <td>{entry.x.toFixed(2)}</td>
                    <td>{entry.y.toFixed(2)}</td>
                    <td>{entry.r.toFixed(2)}</td>
                    <td>
                        <span className={styles["lg-view"]}>
                            {entry.hit ? "Попал" : "Промазал"}
                        </span>
                        <span className={styles["sm-view"]}>
                            {entry.hit ? "✅" : "❌"}
                        </span>
                    </td>
                    <td>
                        <span className={styles["lg-view"]}>
                            {new Date(entry.reqTime).toLocaleTimeString()}
                        </span>
                        <span className={styles["sm-view"]}>
                            {new Date(entry.reqTime).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}
                        </span>
                    </td>
                    <td>{entry.procTime} мкс</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

HistoryTable.propTypes = {
    history: PropTypes.array
}

export default HistoryTable;
