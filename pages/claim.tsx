import {
    ConnectWallet,
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useContractRead,
    useOwnedNFTs,
    useTokenBalance,
    Web3Button,
  } from "@thirdweb-dev/react";
  import { BigNumber, ethers } from "ethers";
  import type { NextPage } from "next";
  import { useEffect, useState } from "react";
  import NFTCard from "../components/NFTCard";
  import {
    nftDropContractAddress,
    stakingContractAddress,
    tokenContractAddress,
  } from "../consts/contractAddresses";
  import styles from "../styles/Home.module.css";
  
  const Stake: NextPage = () => {
    const address = useAddress();
    const { contract: nftDropContract } = useContract(
      nftDropContractAddress,
      "nft-drop"
    );
    const { contract: tokenContract } = useContract(
      tokenContractAddress,
      "token"
    );
    const { contract, isLoading } = useContract(stakingContractAddress);
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
      address,
    ]);
  
    useEffect(() => {
      if (!contract || !address) return;
  
      async function loadClaimableRewards() {
        const stakeInfo = await contract?.call("getStakeInfo", [address]);
        setClaimableRewards(stakeInfo[1]);
      }
  
      loadClaimableRewards();
    }, [address, contract]);
  
    async function stakeNft(id: string) {
      if (!address) return;
  
      const isApproved = await nftDropContract?.isApproved(
        address,
        stakingContractAddress
      );
      if (!isApproved) {
        await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
      }
      await contract?.call("stake", [[id]]);
    }
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className={styles.container}>
        
  
        {!address ? (
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
        ) : (
          <>
            <h1>Claim H Tokens</h1>
            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {tokenBalance?.symbol}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                </p>
              </div>
            </div>
            <br/>
            <Web3Button
              action={(contract) => contract.call("claimRewards")}
              contractAddress={stakingContractAddress}
            >
              Claim Rewards
            </Web3Button>
  
            
  
            
            
          </>
        )}
      </div>
    );
  };
  
  export default Stake;