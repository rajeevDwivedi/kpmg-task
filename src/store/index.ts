import { create } from "zustand";

interface ChatData {
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
  }>;
}

interface Chat {
  id: number;
  role: string;
  data: ChatData[];
}

interface State {
  chats: Chat[];
  submitChat: (chatData: ChatData) => void;
}


const useStore = create<State>((set) => ({
  chats: [],
  submitChat: (chatData: ChatData) => {
    if (chatData.choices[0].delta.role === "user") {
      return set((state) => ({
        chats: [...state.chats, { id: Date.now(), role: 'user', data: [chatData] }],
      }));
    }
  
    return set((state) => {
      const chats = [...state.chats];
      const last = chats[chats.length - 1];

      let lastChat: Chat;

      if (last && last.role === 'assistant') {
        chats.pop();
        lastChat = last;
      } else {
        lastChat = { id: Date.now(), role: 'assistant', data: [] };
      }

      lastChat.data.push(chatData);

      return { chats: [...chats, lastChat] };
    });

  },
}));
export default useStore;
