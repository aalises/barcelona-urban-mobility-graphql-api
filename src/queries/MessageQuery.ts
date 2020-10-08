import Message from "../types/outputs/Message";
import type { Message as MessageType } from "../types";

export default {
  type: Message,
  resolve: (): MessageType => {
    return {
      message: "Hello World",
      description: "It is your regular message",
    };
  },
};
