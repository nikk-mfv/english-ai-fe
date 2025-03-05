import { Link } from 'react-router-dom';

function History() {
    return (
        <div>
            <h1>
    Hello world!
  </h1>
            <p>This is the home page where you can start exploring your vocabulary and learning history.</p>
            
            <nav>
                <h2>Navigation</h2>
                <ul>
                    <li><Link to="/my-words">My Words</Link></li>
                    <li><Link to="/history">History</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default History;