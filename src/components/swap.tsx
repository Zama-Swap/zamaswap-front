import { useBalance } from '@/hooks/use-balance'
import { useSwap } from '@/hooks/use-swap'
import { formatAddress } from '@/lib/format'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { RefreshCw, Wallet } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import TokenInput from './token-input'
import TokenSelectorModal from './token-selector-modal'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

const Swap = () => {
  const { isConnected } = useAccount()

  const [isModalOpenSell, setIsModalOpenSell] = useState(false)
  const [isModalOpenBuy, setIsModalOpenBuy] = useState(false)
  
  const {
    change,
    isAuthorized,
    authorize,
    decryptAlgo,
    isCalculate,
    swap,
    inputAmount,
    setInputAmount,
    inputToken,
    setInputToken,
    outputToken,
    setOutputToken,
    outputAmount,
    encryptedOutputAmount,
    minOutAmount,
    encryptedMinOutAmount,
  } = useSwap()

  const {
    balanceA,
    balanceB,
    encryptedBalance,
    decryptBalanceA,
    isEncryptingA,
    decryptBalanceB,
    isEncryptingB,
  } = useBalance()

  // Memoized handlers to prevent unnecessary re-renders
  const handleModalOpenSell = useCallback(() => setIsModalOpenSell(true), [])
  const handleModalOpenBuy = useCallback(() => setIsModalOpenBuy(true), [])
  const handleModalCloseSell = useCallback(() => setIsModalOpenSell(false), [])
  const handleModalCloseBuy = useCallback(() => setIsModalOpenBuy(false), [])

  // Memoized balance data
  const inputBalance = useMemo(() => {
    return inputToken.ticker === 'TokenA' ? balanceA : balanceB
  }, [inputToken.ticker, balanceA, balanceB])

  const outputBalance = useMemo(() => {
    return outputToken.ticker === 'TokenA' ? balanceA : balanceB
  }, [outputToken.ticker, balanceA, balanceB])

  const inputEncryptedBalance = useMemo(() => {
    return encryptedBalance?.[inputToken.ticker as 'TokenA' | 'TokenB'] || ''
  }, [encryptedBalance, inputToken.ticker])

  const outputEncryptedBalance = useMemo(() => {
    return encryptedBalance?.[outputToken.ticker as 'TokenA' | 'TokenB'] || ''
  }, [encryptedBalance, outputToken.ticker])

  // Memoized decrypt handlers
  const handleDecryptInputBalance = useCallback(() => {
    if (inputToken.ticker === 'TokenA') {
      decryptBalanceA()
    } else {
      decryptBalanceB()
    }
  }, [inputToken.ticker, decryptBalanceA, decryptBalanceB])

  const handleDecryptOutputBalance = useCallback(() => {
    if (outputToken.ticker === 'TokenA') {
      decryptBalanceA()
    } else {
      decryptBalanceB()
    }
  }, [outputToken.ticker, decryptBalanceA, decryptBalanceB])

  return (
    <div className='px-10'>
      <div className='space-y-5 relative'>
        <TokenInput
          type='sell'
          openModal={handleModalOpenSell}
          disabledInput={inputToken.address === ''}
          onSelectToken={setInputToken}
          token={inputToken}
          value={inputAmount}
          onChange={setInputAmount}
          wallet={
            <div className='self-end flex items-center gap-2'>
              <Wallet />
              <Dialog>
                <DialogTrigger asChild>
                  <span className='cursor-pointer hover:text-primary transition-colors duration-200'>
                    {formatAddress(inputEncryptedBalance)}
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Balance</DialogTitle>
                    <DialogDescription className='text-xl break-all'>
                      {inputBalance || inputEncryptedBalance}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      className='bg-amber-500 text-white text-xl'
                      onClick={handleDecryptInputBalance}
                      disabled={isEncryptingA || !inputEncryptedBalance}
                    >
                      {isEncryptingA ? 'Encrypting...' : 'Encrypt'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          }
        />
        <TokenInput
          disabledInput
          type='buy'
          openModal={handleModalOpenBuy}
          token={outputToken}
          onSelectToken={setOutputToken}
          output={{
            encryptedValue: encryptedMinOutAmount,
            decryptedValue: minOutAmount,
          }}
          estimatedOutput={{
            encryptedValue: encryptedOutputAmount,
            decryptedValue: outputAmount,
          }}
          wallet={
            <div className='self-end flex items-center gap-2'>
              <Wallet />
              <Dialog>
                <DialogTrigger asChild>
                  <span className='cursor-pointer hover:text-primary transition-colors duration-200'>
                    {formatAddress(outputEncryptedBalance)}
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Balance</DialogTitle>
                    <DialogDescription className='text-xl break-all'>
                      {outputBalance || outputEncryptedBalance}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      className='bg-amber-500 text-white text-xl'
                      onClick={handleDecryptOutputBalance}
                      disabled={isEncryptingB || !outputEncryptedBalance}
                    >
                      {isEncryptingB ? 'Encrypting...' : 'Encrypt'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          }
        />
        <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
          <div className='relative'>
            <Button
              className='w-14 h-14 rounded-lg text-white  bg-secondary hover:bg-gray-300 hover:scale-110 hover:text-black'
              onClick={() => change()}
            >
              <RefreshCw className='size-7  mx-auto' />
            </Button>
          </div>
        </div>
      </div>
      <TokenSelectorModal
        type='sell'
        isOpen={isModalOpenSell}
        setIsOpen={setIsModalOpenSell}
        setToken={setInputToken}
        inputToken={inputToken}
        outputToken={outputToken}
      />

      <TokenSelectorModal
        type='buy'
        isOpen={isModalOpenBuy}
        setIsOpen={setIsModalOpenBuy}
        setToken={setOutputToken}
        inputToken={inputToken}
        outputToken={outputToken}
      />
      <div className='flex justify-center items-center'>
        {!isConnected ? (
          <ConnectButton />
        ) : !isAuthorized ? (
          <Button
            className='w-full rounded-full h-14 mt-2 text-xl'
            onClick={authorize}
          >
            Authorize {inputToken.ticker || '--'} & Calculate the sale
          </Button>
        ) : !isCalculate ? (
          <Button
            className='w-full rounded-full h-14 mt-2 text-xl'
            onClick={decryptAlgo}
          >
            Calculate the purchase (Two Signatures)
          </Button>
        ) : (
          <Button
            className='w-full rounded-full h-14 mt-2 text-xl'
            onClick={swap}
          >
            Swap
          </Button>
        )}
      </div>
    </div>
  )
}

export default Swap
