import Header from '../components/Header'
import Main from "../components/Main"
import TransactionHistory from "../components/TransactionHistory"

const style = {
  wrapper: `w-screen text-white select-none flex flex-col justify-between`,
}

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <Main />
      <TransactionHistory/>
    </div>
  )
}
