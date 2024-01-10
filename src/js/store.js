import { createStore } from "framework7/lite";

const store = createStore({
  state: {
    conversations: [],
  },
  actions: {
    getConversations({ state }) {
      // fetch all conversations from API
      fetch(
        "https://chat.peable.co/conversations.php?clientKey=khbY9d3oj8PJTNFUMGmRrv47eu1xVECgSWQ2Ii0a6ynBtDAZqpfw5slHKOXLzc"
      )
        .then((res) => res.json())
        .then((conversations) => {
          // assign new conversations to store state.conversations
          state.conversations = conversations;
          console.log(conversations);
        });
    },
    getConversation({ state }, id) {
      // fetch specific conversation with id from API
      fetch(
        `https://chat.peable.co/conversation.php?clientKey=khbY9d3oj8PJTNFUMGmRrv47eu1xVECgSWQ2Ii0a6ynBtDAZqpfw5slHKOXLzc&id=${id}`
      )
        .then((res) => res.json())
        .then((conversation) => {
          console.log(conversation);
          // return the specific conversation
          return conversation;
        });
    },
  },
  getters: {
    conversations({ state }) {
      // return all conversations from store state
      return state.conversations;
    },
    getConversationById({ state }, id) {
      // retrieve specific conversation by id
      const conversations = state.conversations;
      return conversations.find((conversation) => conversation.id === id);
    },
  },
});
export default store;
