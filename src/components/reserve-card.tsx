import { useReserve } from '@/hooks/use-reserve'
import { formatAddress } from '@/lib/format'
import { useWriterContract } from '@/hooks/use-writer-contract'
import { fheSwapAddress } from '@/lib/contract'
import { userDecrypt } from '@/lib/fhe/user-decrypt'
import { useMutation } from '@tanstack/react-query'
import { ethers, type Wallet } from 'ethers'
import { useCallback } from 'react'
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

const ReserveCard = () => {
  const { reserve } = useReserve()

  const { signer } = useWriterContract()

  const {
    mutate: decryptTokenA,
    data: decryptedTokenA,
    isPending: isDecryptingTokenA,
  } = useMutation({
    mutationFn: useCallback(async () => {
      if (!reserve?.tokenA || !signer) {
        throw new Error('Missing reserve data or signer')
      }
      const decryptedTokenA = await userDecrypt(
        reserve.tokenA,
        fheSwapAddress,
        signer as Wallet
      )
      return ethers.formatUnits(decryptedTokenA, 6)
    }, [reserve?.tokenA, signer]),
  })

  const {
    mutate: decryptTokenB,
    data: decryptedTokenB,
    isPending: isDecryptingTokenB,
  } = useMutation({
    mutationFn: useCallback(async () => {
      if (!reserve?.tokenB || !signer) {
        throw new Error('Missing reserve data or signer')
      }
      const decryptedTokenB = await userDecrypt(
        reserve.tokenB,
        fheSwapAddress,
        signer as Wallet
      )
      return ethers.formatUnits(decryptedTokenB, 6)
    }, [reserve?.tokenB, signer]),
  })

  return (
    <div className='bg-black/20 border-2 border-white/10 backdrop-blur-sm rounded-full p-4 space-x-2'>
      <Dialog>
        <DialogTrigger asChild>
          <span className='cursor-pointer'>
            Reserve TokenA: {formatAddress(reserve?.tokenA)}
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reserve TokenA</DialogTitle>
          </DialogHeader>
          <DialogDescription className='break-all text-xl'>
            {decryptedTokenA || reserve?.tokenA}
          </DialogDescription>
          <DialogFooter>
            <Button
              variant='outline'
              className='bg-amber-500 text-white'
              onClick={() => decryptTokenA()}
              disabled={isDecryptingTokenA}
            >
              {isDecryptingTokenA ? 'Decrypting...' : 'Decrypt'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <span className='cursor-pointer'>
            Reserve TokenB: {formatAddress(reserve?.tokenB)}
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reserve TokenB</DialogTitle>
          </DialogHeader>
          <DialogDescription className='break-all text-xl'>
            {decryptedTokenB || reserve?.tokenB}
          </DialogDescription>
          <DialogFooter>
            <Button
              variant='outline'
              className='bg-amber-500 text-white'
              onClick={() => decryptTokenB()}
              disabled={isDecryptingTokenB}
            >
              {isDecryptingTokenB ? 'Decrypting...' : 'Decrypt'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ReserveCard
