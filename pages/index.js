import HomePage from '../Components/Home/Home';
import Showcase from '../Components/Showcase/Showcase';
import Trails from '../Components/Trails/Traits.js';
import Creators from '../Components/Creators/Creators';
import styles from '../styles/Home.module.css';

import Header from '../Components/Header';
// className={styles.container}

export default function Home() {
    return (
        <div className={styles.bg}>
            <Header />
            <div>
                <HomePage />
                <Showcase />
                <Trails />
                <Creators />
            </div>
        </div>
    );
}
