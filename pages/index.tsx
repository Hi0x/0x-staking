import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <br>
      </br>
      <h1 className={styles.h1}>0x Domain Staking</h1>
      <p className={styles.selectBoxDescription}>
      <br/>
      Stake Your Domains, Get H Token</p>
      <br/>
      <br/>
      <br/>
      <div className={styles.nftBoxGrid}>
        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("/stake")}
        >
          
        <Image src="/icons/stak.png" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Stake</h2>
          
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("/claim")}
        >
          {/* Staking an NFT */}
          <Image src="/icons/clai.png" alt="drop" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Claim </h2>
        
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("/Withdraw")}
        >
          {/* Staking an NFT */}
          <Image src="/icons/with.png" alt="drop" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Withdraw</h2>
          
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4>0xns ©2024</h4>
    </div>
  );
};

export default Home;
