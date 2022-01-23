import BrewculatorImage from "../assets/brewculatorImage.png";

import styles from "../styles/About.module.css";

export default function About(props) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>About us</h1>
      <img
        src={BrewculatorImage}
        alt="Brewculator logo with background"
        className={styles.image}
      />
      <p className={styles.paragraph}>
        Brewculator is a passion project of Alexander Traykov and Petar Dyakov.
        It was born when Alex noticed that while brewing, he had to double-check
        the specific ratios, then find a calculator, then find a timer and after
        all that's set up he actually focus on the craft of making a cup.
      </p>
      <p className={styles.paragraph}>
        All of these complications started bothering him and did impact the
        quality of my coffee at times. At that moment the idea was born - Petar
        and Alex should make a calculator that has a bunch of pre-made ratios
        for the most popular brewing methods, fine control over the measuring
        units and probably some general tips of the brewing method itself.
      </p>
      <p className={styles.paragraph}>
        So here it is - some months later, lots of cups of coffee, design
        thinking and engineering we present you the Web variant of Brewculator.
      </p>
    </div>
  );
}
