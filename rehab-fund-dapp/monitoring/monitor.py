import asyncio
import os
from web3 import AsyncWeb3
from prometheus_client import start_http_server, Counter, Gauge
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DONATED = Counter("rehab_donations_total", "Total donations received", ["token"])
RELEASED = Counter("rehab_releases_total", "Total funds released", ["token"])
TOTAL_LOCKED = Gauge("rehab_locked_balance", "Current locked balance", ["token"])

CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
RPC_URL = os.getenv("RPC_URL", "https://rpc.sepolia.org")

ABI = [
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "name": "donor", "type": "address"},
            {"indexed": True, "name": "token", "type": "address"},
            {"indexed": False, "name": "amount", "type": "uint256"},
        ],
        "name": "Donated",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "name": "to", "type": "address"},
            {"indexed": True, "name": "token", "type": "address"},
            {"indexed": False, "name": "amount", "type": "uint256"},
        ],
        "name": "Released",
        "type": "event",
    },
    {
        "inputs": [{"name": "token", "type": "address"}],
        "name": "lockedBalance",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
]


async def main():
    start_http_server(8000)  # Prometheus metrics on :8000/metrics
    w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(RPC_URL))

    if not await w3.is_connected():
        logger.error("Failed to connect to RPC at %s", RPC_URL)
        return

    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)
    logger.info("Listening to %s on %s", CONTRACT_ADDRESS, RPC_URL)

    from_block = await w3.eth.block_number

    while True:
        try:
            current_block = await w3.eth.block_number
            if current_block < from_block:
                await asyncio.sleep(12)
                continue

            donated_logs = await w3.eth.get_logs(
                {
                    "address": CONTRACT_ADDRESS,
                    "fromBlock": from_block,
                    "toBlock": current_block,
                    "topics": [w3.keccak(text="Donated(address,address,uint256)")],
                }
            )
            released_logs = await w3.eth.get_logs(
                {
                    "address": CONTRACT_ADDRESS,
                    "fromBlock": from_block,
                    "toBlock": current_block,
                    "topics": [w3.keccak(text="Released(address,address,uint256)")],
                }
            )

            seen_tokens = set()

            for log in donated_logs:
                decoded = contract.events.Donated().process_log(log)
                token = decoded.args.token
                amount = decoded.args.amount / 1e18
                DONATED.labels(token=token).inc(amount)
                seen_tokens.add(token)
                logger.info("Donated %.4f from %s (token %s)", amount, decoded.args.donor, token)

            for log in released_logs:
                decoded = contract.events.Released().process_log(log)
                token = decoded.args.token
                amount = decoded.args.amount / 1e18
                RELEASED.labels(token=token).inc(amount)
                seen_tokens.add(token)
                logger.info("Released %.4f to %s (token %s)", amount, decoded.args.to, token)

            for token in seen_tokens:
                try:
                    bal = await contract.functions.lockedBalance(token).call()
                    TOTAL_LOCKED.labels(token=token).set(bal / 1e18)
                except Exception:
                    pass

            from_block = current_block + 1
            await asyncio.sleep(12)
        except Exception as e:
            logger.error("Error: %s", e)
            await asyncio.sleep(30)


if __name__ == "__main__":
    asyncio.run(main())
