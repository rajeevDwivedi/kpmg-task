export interface ChatData {
  id: number;
  created: number;
  role?: string;
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
  }>;
}

export interface Chat {
  id?: number;
  role?: string;
  data: ChatData[];
}


export interface State {
  chats: Chat[];
  submitChat: (chatData: ChatData) => void;
}
