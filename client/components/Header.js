import { useState, useEffect, useContext } from "react"
import Image from "next/image"

// context
import { TransactionContext } from "../context/TransactionContext"

// icons
import { FiArrowRight } from "react-icons/fi"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineDotsVertical } from "react-icons/hi"

// assets
import ethLogo from "../assets/eth.png"
import uniswapLogo from "../assets/uniswap.png"

const style = {
    wrapper: `p-4 w-screen flex justify-between items-center`,
    headerLogo: `flex w-1/4 items-center justify-start`,
    nav: `flex-1 flex justify-center items-center`,
    navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
    navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
    activeNavItem: `bg-[#20242A]`,
    buttonsContainer: `flex w-1/4 justify-end items-center`,
    button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
    buttonPadding: `p-2`,
    buttonTextContainer: `h-8 flex items-center`,
    buttonIconContainer: `flex items-center justify-center w-8 h-8`,
    buttonAccent: `bg-[#172A42] text-ellipsis border border-[#163256] hover:border-[#234169] w-44 h-full rounded-xl flex items-center justify-center text-[#4F90EA]`,
}

const Header = () => {
    const [selectNav, setSelectNav] = useState('swap')
    const {  connectWallet,
        currentAccount, } = useContext(TransactionContext)
    const [userName, setUserName] = useState()

    useEffect(() => {
        if (!currentAccount) return
        setUserName(`${currentAccount.slice(0, 7)} ... ${currentAccount.slice(35)}`)
    }, [currentAccount])

    return (
        <div className={style.wrapper}>
            <div className={style.headerLogo}>
                <Image src={uniswapLogo} width={50} height={50} />
            </div>
            <div className={style.nav}>
                <div className={style.navItemsContainer}>
                    <div
                        onClick={() => setSelectNav('swap')}
                        className={`${style.navItem} ${selectNav === 'swap' && style.activeNavItem}`}
                    >
                        Swap
                    </div>
                    <div
                        onClick={() => setSelectNav('pool')}
                        className={`${style.navItem} ${selectNav === 'pool' && style.activeNavItem}`}
                    >
                        Pool
                    </div>
                    <div
                        onClick={() => setSelectNav('vote')}
                        className={`${style.navItem} ${selectNav === 'vote' && style.activeNavItem}`}
                    >
                        Vote
                    </div>
                    <a
                        href="https://info.uniswap.org/"
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        <div className={style.navItem}>
                            Charts <FiArrowRight />
                        </div>
                    </a>
                </div>
            </div>

            <div className={style.buttonsContainer}>
                <div className={`${style.button} ${style.buttonPadding}`}>
                    <div className={style.buttonIconContainer}>
                        <Image src={ethLogo} width={20} height={20} />
                    </div>
                    <p>Ethereum</p>
                    <div className={style.buttonIconContainer}>
                        <AiOutlineDown />
                    </div>
                </div>

                {currentAccount ?
                    (
                        <div className={`${style.button} ${style.buttonPadding}`}>
                            <div className={`${style.buttonPadding} w-44`}>
                                {userName}
                            </div>
                        </div>
                    )
                    :
                    (
                        <div
                            onClick={() => connectWallet()}
                            className={`${style.button} ${style.buttonPadding}`}
                        >
                            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                                Connect Wallet
                            </div>
                        </div>
                    )}


                <div className={`${style.button} ${style.buttonPadding}`}>
                    <div className={`${style.buttonIconContainer} mx-2`}>
                        <HiOutlineDotsVertical />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header