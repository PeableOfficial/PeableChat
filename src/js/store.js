import { createStore } from "framework7/lite";

const store = createStore({
  state: {
    conversations: [],
  },
  actions: {
    async getConversations({ state }) {
      try {
        const response = await fetch(
          "https://chat.peable.co/conversations.php?clientKey=khbY9d3oj8PJTNFUMGmRrv47eu1xVECgSWQ2Ii0a6ynBtDAZqpfw5slHKOXLzc"
        );
        const conversations = await response.json();

        if (!state.conversations.length) {
          state.conversations = conversations;
        }
        //console.log(conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    },

    async getConversation({ state }, id) {
      try {
        const conversationResponse = await fetch(
          `https://chat.peable.co/api/v1/messages.php?clientKey=khbY9d3oj8PJTNFUMGmRrv47eu1xVECgSWQ2Ii0a6ynBtDAZqpfw5slHKOXLzc&id=${id}`
        );
        const conversation = await conversationResponse.json();

        const conversationToUpdate = state.conversations.find(
          (c) => c.id.toString() === id.toString()
        );

        if (conversationToUpdate) {
          conversationToUpdate.messages = conversation;
        }

        const peopleResponse = await fetch(
          `https://chat.peable.co/api/v1/people.php?clientKey=khbY9d3oj8PJTNFUMGmRrv47eu1xVECgSWQ2Ii0a6ynBtDAZqpfw5slHKOXLzc&conversationId=${id}`
        );
        const people = await peopleResponse.json();

        conversationToUpdate.people = people;
        console.log(people.users);

        return { conversation, people };
      } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
      }
    },
  },

  getters: {
    conversations({ state }) {
      // return all conversations from store state
      return state.conversations;
    },
    getConversationById({ state }, id) {
      // retrieve specific conversation by id
      const conversation = state.conversations.find((c) => c.id === id);
      return state.conversations;
    },
  },
});

export default store;
