import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { FlowUpdated } from "../generated/AudityzerFlows/CFAv1Forwarder";
import { Stream, AudityzerTVL } from "../generated/schema";

const AUDITYZER_TVL_ID = "audityzer-tvl";
const AUDITYZER_ADDR = "AUDITYZER_ADDR_PLACEHOLDER"; // will be replaced

export function handleFlowUpdated(event: FlowUpdated): void {
  let streamId = event.params.sender.toHexString() + "-" + event.params.receiver.toHexString() + "-" + event.params.token.toHexString();

  let stream = Stream.load(streamId);
  if (stream == null) {
    stream = new Stream(streamId);
    stream.sender = event.params.sender;
    stream.receiver = event.params.receiver;
    stream.token = event.params.token;
    stream.createdAt = event.block.timestamp;
  }
  stream.flowRate = event.params.flowRate;
  stream.updatedAt = event.block.timestamp;
  stream.save();

  // Update TVL tracker if receiver is Audityzer
  if (event.params.receiver.toHexString().toLowerCase() == AUDITYZER_ADDR) {
    let tvl = AudityzerTVL.load(AUDITYZER_TVL_ID);
    if (tvl == null) {
      tvl = new AudityzerTVL(AUDITYZER_TVL_ID);
      tvl.totalInflowRate = BigInt.fromI32(0);
      tvl.activeStreams = 0;
    }

    if (event.params.flowRate.gt(BigInt.fromI32(0))) {
      tvl.totalInflowRate = tvl.totalInflowRate.plus(event.params.flowRate);
      tvl.activeStreams += 1;
    } else {
      // Stream closed
      tvl.activeStreams -= 1;
    }
    tvl.updatedAt = event.block.timestamp;
    tvl.save();
  }
}
