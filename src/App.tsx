import React from 'react';
import './App.css';
import {MineSweeperGpt401} from './features/MineSweeperGpt4_01';

function App() {
    return (
        <div className="App">
            Mine Sweeper test
            <ol>
                <li>... first test failed</li>
                <li>... second test failed</li>
                <li>... third test</li>
            </ol>
            <MineSweeperGpt401 />
        </div>
    );
}

export default App;
