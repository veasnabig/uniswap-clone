import { useEffect, useState, useContext } from "react"
import { client } from "../lib/sanityClient"
import { TransactionContext } from "../context/TransactionContext"
import Image from "next/image"
import ethLogo from "../assets/eth.png"
import { FiArrowUpRight } from "react-icons/fi"
import { css } from "@emotion/react"
import { MoonLoader } from "react-spinners"

const style = {
    wrapper: `text-white select-none w-screen flex-1 pt-14 flex items-center justify-center pb-12 overflow-scroll px-8`,
    txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
    txDetails: `flex items-center`,
    toAddress: `text-[#f48706] mx-2`,
    txTimestamp: `mx-2`,
    etherscanLink: `flex items-center text-[#2172e5]`,
}

const cssOverride = css`
    display: block;
    margin: 0 auto;
    border-color: white;
    margin-top: 50px;
  `

const TransactionHistory = () => {
    const { isLoading, currentAccount } = useContext(TransactionContext)
    const [transactionHistory, setTransactionHistory] = useState()

    useEffect(() => {
        ; (async () => {
            if (!isLoading && currentAccount) {
                const query = `
                    *[_type == 'users' && _id == "${currentAccount}"] {
                        "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..4]
                    }
                `
                const clientRes = await client.fetch(query)
                if (clientRes[0].transactionList.length > 0) {
                    setTransactionHistory(clientRes[0].transactionList)
                }
            }
        })()
    }, [isLoading, currentAccount])

    return (
        <div className={style.wrapper}>
            <div>
                <h2 className="text-2xl mb-5">Transaction History</h2>
                {/* {currentAccount && transactionHistory && } */}
                {currentAccount && transactionHistory &&
                    transactionHistory?.map((transaction, index) => (
                        <div className={style.txHistoryItem} key={index}>
                            <div className={style.txDetails}>
                                <Image src={ethLogo} height={20} width={20} alt='eth' />
                                {transaction.amount} = sent to{' '}
                                <span className={style.toAddress}>
                                    {transaction.toAddress.substring(0, 6)}...
                                </span>
                            </div>{' '}
                            on{' '}
                            <div className={style.txTimestamp}>
                                {new Date(transaction.timestamp).toLocaleString('en-US', {
                                    // timeZone: 'PST',
                                    timeZone: 'UTC',
                                    hour12: true,
                                    timeStyle: 'short',
                                    dateStyle: 'long',
                                })}
                            </div>
                            <div className={style.etherscanLink}>
                                <a
                                    href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    className={style.etherscanLink}
                                >
                                    View on Etherscan
                                    <FiArrowUpRight />
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default TransactionHistory