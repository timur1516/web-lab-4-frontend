import React, { useEffect, useRef } from "react";
import styles from "./Graph.module.css";

function Graph(props) {
    const calculatorRef = useRef(null);
    const desmosCalculator = useRef(null);

    function initGraph() {
        desmosCalculator.current = window.Desmos.GraphingCalculator(calculatorRef.current, {
            keypad: false,
            expressions: false,
            settingsMenu: false,
            lockViewport: true,
            zoomFit: true,
            pointsOfInterest: false,
            trace: false,
            xAxisStep: 1,
            yAxisStep: 1,
            showGrid: false
        });
    }

    function draw_graph(r) {
        desmosCalculator.current.setExpression({
            id: 'area1',
            latex: `x^{2}+y^{2}<=${r}^2\\{y>=0\\}\\{x>=0\\}`,
            color: Desmos.Colors.BLUE
        });
        desmosCalculator.current.setExpression({
            id: 'area2',
            latex: `y<=2x+${r}\\{y>=0\\}\\{x<=0\\}`,
            color: Desmos.Colors.BLUE
        });
        desmosCalculator.current.setExpression({
            id: 'area3',
            latex: `-${r}<=x<=0\\{-${r}/2<=y<=0\\}`,
            color: Desmos.Colors.BLUE
        });
        desmosCalculator.current.setExpression({
            id: 'line1',
            latex: `y=0\\{-${r}<=x<=-${r}/2\\}`,
            color: Desmos.Colors.BLUE
        });
        desmosCalculator.current.setExpression({
            id: 'line2',
            latex: `y=-${r}/2\\{-${r}<=x<=0\\}`,
            color: Desmos.Colors.BLUE
        });
        desmosCalculator.current.setExpression({
            id: 'line3',
            latex: `y=0\\{0<=x<=${r}\\}`,
            color: Desmos.Colors.BLUE
        });
        desmosCalculator.current.setMathBounds({
            left: -r - 1,
            right: r + 1,
            bottom: -r - 1,
            top: r + 1
        });
    }

    function destroyGraph() {
        if (desmosCalculator.current) {
            desmosCalculator.current.destroy();
        }
    }

    useEffect(() => {
        if (window.Desmos) initGraph();
        return destroyGraph;
    }, []);

    useEffect(() => {
        draw_graph(props.radius);
    }, [props.radius]);

    function handleGraphClick(event) {
        let calculatorRect = calculatorRef.current.getBoundingClientRect();
        let { x, y } = desmosCalculator.current.pixelsToMath({
            x: event.clientX - calculatorRect.left,
            y: event.clientY - calculatorRect.top
        });
        let hit = props.pointChecker(x, y, props.radius);
        if(hit !== null){
            desmosCalculator.current.setExpression({
                latex: `(${x}, ${y})`,
                color: hit ? 'green' : 'red'
            });
        }
    }

    return (
        <div
            className={styles["graph-container"]}
            ref={calculatorRef}
            onClick={handleGraphClick}
        ></div>
    );
}

export default Graph;
