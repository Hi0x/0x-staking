import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="0x staking sample logo" 
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/stake" className={styles.link}>
              Stake
            </Link>
            <Link href="/Withdraw" className={styles.link}>
              Withdraw
            </Link>
            <Link href="/claim" className={styles.link}>
             Claim
            </Link>
            <Link href="https://0xns.pro" className={styles.link}>
              Mint
            </Link>
            <Link href="https://hstake.0xns.pro" className={styles.link}>
              H stake
            </Link>
            
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
          <ConnectWallet
          theme={"dark"}
          btnTitle={"Connect Wallet"}
          modalTitle={""}
          modalSize={"wide"}
          welcomeScreen={{
            title: "0x Domain Staking",
            subtitle: "Stake Your Domains, Get H Token",
            img: {
              src: "https://i.imgur.com/xJ4sJC0.png",
              width: 150,
              height: 150,
            },
          }}
          modalTitleIconUrl={
            "https://i.imgur.com/xJ4sJC0.png"
          }
        />
          </div>
        </div>
      </nav>
    </div>
  );
}
