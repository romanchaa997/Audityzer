import os
import asyncio
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message
from web3 import AsyncWeb3
import logging

logging.basicConfig(level=logging.INFO)

bot = Bot(token=os.getenv("TELEGRAM_BOT_TOKEN"))
dp = Dispatcher()

CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
RPC_URL = os.getenv("RPC_URL", "https://rpc.sepolia.org")
CHAIN_ID = 11155111

w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(RPC_URL))


@dp.message(Command("donate"))
async def donate_handler(message: Message):
    await message.answer(
        f"To donate to verified rehabilitation NGOs:\n"
        f"Contract: `{CONTRACT_ADDRESS}`\n\n"
        f"1. Approve your ERC-20 token (USDT/USDC/DAI)\n"
        f"2. Call donate(token, amount)\n"
        f"Network: Sepolia (testnet) / Chain ID {CHAIN_ID}\n\n"
        f"Full transparency: all donations tracked on-chain + Grafana dashboard"
    )


@dp.message(Command("status"))
async def status_handler(message: Message):
    try:
        balance_eth = await w3.eth.get_balance(CONTRACT_ADDRESS) / 1e18
        await message.answer(
            f"Contract Status:\n"
            f"Address: `{CONTRACT_ADDRESS}`\n"
            f"ETH balance: {balance_eth:.4f} ETH\n"
            f"View full audit log: /audit_log"
        )
    except Exception:
        await message.answer("Error reading contract status")


@dp.message(Command("audit_log"))
async def audit_log_handler(message: Message):
    await message.answer(
        f"Full audit log available at:\n"
        f"Etherscan: https://sepolia.etherscan.io/address/{CONTRACT_ADDRESS}\n\n"
        f"Grafana Dashboard: http://localhost:3000\n"
        f"Prometheus Metrics: http://localhost:9090"
    )


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
