import os
import logging
from fastapi import FastAPI, Query, HTTPException
from web3 import Web3
from web3.exceptions import ContractLogicError
from typing import List, Dict

logging.basicConfig(level=logging.INFO)
app = FastAPI(title="Rehab Fund API", version="1.0")

w3 = Web3(Web3.HTTPProvider(os.getenv("RPC_URL", "https://rpc.sepolia.org")))
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "0x0000000000000000000000000000000000000000")

if not w3.is_connected():
    logging.error("Cannot connect to RPC")

ABI = [
    {"anonymous": False, "inputs": [{"indexed": True, "name": "donor", "type": "address"}, {"indexed": True, "name": "token", "type": "address"}, {"indexed": False, "name": "amount", "type": "uint256"}], "name": "Donated", "type": "event"},
    {"anonymous": False, "inputs": [{"indexed": True, "name": "to", "type": "address"}, {"indexed": True, "name": "token", "type": "address"}, {"indexed": False, "name": "amount", "type": "uint256"}], "name": "Released", "type": "event"},
    {"inputs": [{"name": "token", "type": "address"}], "name": "lockedBalance", "outputs": [{"name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}
]

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

@app.get("/")
def root():
    """Health check and info endpoint"""
    return {
        "service": "RehabFund API",
        "version": "1.0",
        "contract": CONTRACT_ADDRESS,
        "rpc_connected": w3.is_connected(),
        "latest_block": w3.eth.block_number if w3.is_connected() else None
    }

@app.get("/donations")
def get_donations(limit: int = Query(10, ge=1, le=50)):
    """Return last N Donated events (most recent first)"""
    try:
        latest = w3.eth.block_number
        from_block = max(0, latest - 2000)
        logs = w3.eth.get_logs({
            "address": CONTRACT_ADDRESS,
            "topics": [w3.keccak(text="Donated(address,address,uint256)")],
            "fromBlock": from_block
        })
        events: List[Dict] = []
        for log in logs[-limit:]:
            decoded = contract.events.Donated().process_log(log)
            events.append({
                "donor": decoded.args.donor,
                "token": decoded.args.token,
                "amount": str(decoded.args.amount),
                "block": log["blockNumber"],
                "tx": log["transactionHash"].hex()
            })
        return {"donations": events[::-1]}  # most recent first
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/releases")
def get_releases(limit: int = Query(10, ge=1, le=50)):
    """Return last N Released events (most recent first)"""
    try:
        latest = w3.eth.block_number
        from_block = max(0, latest - 2000)
        logs = w3.eth.get_logs({
            "address": CONTRACT_ADDRESS,
            "topics": [w3.keccak(text="Released(address,address,uint256)")],
            "fromBlock": from_block
        })
        events: List[Dict] = []
        for log in logs[-limit:]:
            decoded = contract.events.Released().process_log(log)
            events.append({
                "to": decoded.args.to,
                "token": decoded.args.token,
                "amount": str(decoded.args.amount),
                "block": log["blockNumber"],
                "tx": log["transactionHash"].hex()
            })
        return {"releases": events[::-1]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/balance/{token}")
def get_balance(token: str):
    """Return locked balance of any ERC-20 (or zero address for native if extended)"""
    try:
        bal = contract.functions.lockedBalance(token).call()
        return {"token": token, "locked_balance": str(bal)}
    except ContractLogicError:
        raise HTTPException(status_code=400, detail="Invalid token address")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
