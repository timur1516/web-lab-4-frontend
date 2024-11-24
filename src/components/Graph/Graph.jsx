import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import styles from "./Graph.module.css";
import PropTypes from "prop-types";

const Graph = forwardRef(({pointChecker, radius, history}, ref) => {
    const graphContainerRef = useRef(null);
    const graphRef = useRef(null);
    const isDataLoaded = useRef(false);

    function initGraph() {
        graphRef.current = window.Desmos.GraphingCalculator(graphContainerRef.current, {
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

    function drawGraph(r) {
        graphRef.current.setExpression({
            id: "area1",
            latex: `x^{2}+y^{2}<=${r}^2\\{y>=0\\}\\{x>=0\\}`,
            color: window.Desmos.Colors.BLUE
        });
        graphRef.current.setExpression({
            id: "area2",
            latex: `y<=2x+${r}\\{y>=0\\}\\{x<=0\\}`,
            color: window.Desmos.Colors.BLUE
        });
        graphRef.current.setExpression({
            id: "area3",
            latex: `-${r}<=x<=0\\{-${r}/2<=y<=0\\}`,
            color: window.Desmos.Colors.BLUE
        });
        graphRef.current.setExpression({
            id: "line1",
            latex: `y=0\\{-${r}<=x<=-${r}/2\\}`,
            color: window.Desmos.Colors.BLUE
        });
        graphRef.current.setExpression({
            id: "line2",
            latex: `y=-${r}/2\\{-${r}<=x<=0\\}`,
            color: window.Desmos.Colors.BLUE
        });
        graphRef.current.setExpression({
            id: "line3",
            latex: `y=0\\{0<=x<=${r}\\}`,
            color: window.Desmos.Colors.BLUE
        });
        graphRef.current.setMathBounds({
            left: -r - 1,
            right: r + 1,
            bottom: -r - 1,
            top: r + 1
        });
    }

    function destroyGraph() {
        if (graphRef.current) {
            graphRef.current.destroy();
        }
    }

    function handleGraphClick(event) {
        let calculatorRect = graphContainerRef.current.getBoundingClientRect();
        let {x, y} = graphRef.current.pixelsToMath({
            x: event.clientX - calculatorRect.left,
            y: event.clientY - calculatorRect.top
        });
        pointChecker(x, y, radius);
    }

    function drawPoint(x, y, hit) {
        if (hit !== null) {
            graphRef.current.setExpression({
                latex: `(${x}, ${y})`,
                color: hit ? "green" : "red"
            });
        }
    }

    useEffect(() => {
        if (window.Desmos) initGraph();
        return destroyGraph;
    }, []);

    useEffect(() => {
        if (isDataLoaded.current || history.length === 0) return;
        history.forEach((point) => {
            drawPoint(point.x, point.y, point.hit);
        });
        isDataLoaded.current = true;
    }, [history]);

    useEffect(() => {
        drawGraph(radius);
    }, [radius]);

    useImperativeHandle(ref, () => ({drawPoint}));

    return (
        <div
            className={styles["graph-container"]}
            ref={graphContainerRef}
            onClick={handleGraphClick}
        ></div>
    );
});

Graph.propTypes = {
    pointChecker: PropTypes.func,
    radius: PropTypes.number,
    history: PropTypes.array
}

Graph.displayName = "Graph";

export default Graph;
