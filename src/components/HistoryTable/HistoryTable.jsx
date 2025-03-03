import styles from "./HistoryTable.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

function HistoryTable() {
    const history = useSelector((state) => state.historyReducer.history);

    return (
        <table id="history-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>
                    <span className="lg-view">Попадание</span>
                    <span className="sm-view">🎯</span>
                </th>
                <th>
                    <span className="lg-view">Время запроса</span>
                    <span className="sm-view">🕓</span>
                </th>
                <th>
                    <span className="lg-view">Время выполнения</span>
                    <span className="sm-view">🚀</span>
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
                        <span className="lg-view">
                            {entry.hit ? "Попал" : "Промазал"}
                        </span>
                        <span className="sm-view">
                            {entry.hit ? "✅" : "❌"}
                        </span>
                    </td>
                    <td>
                        <span className="lg-view">
                            {new Date(entry.reqTime).toLocaleTimeString()}
                        </span>
                        <span className="sm-view">
                            {new Date(entry.reqTime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
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
