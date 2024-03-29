
<template>
    <f7-page>
        <f7-navbar :title="conversationData.title" back-link="Back" large :sliding="true">
            <f7-nav-right>
                <f7-link icon-ios="f7:phone" icon-md="material:call"></f7-link>
                <f7-link icon-ios="f7:videocam" icon-md="material:videocam"></f7-link>
                <f7-link icon-ios="f7:ellipsis_vertical" icon-md="material:more_vert"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-messagebar ref="messagebar" v-model:value="messageText" :placeholder="placeholder"
            :attachments-visible="attachmentsVisible" :sheet-visible="sheetVisible">
            <template #inner-start>
                <f7-link icon-ios="f7:camera_fill" icon-md="material:camera_alt" @click="sheetVisible = !sheetVisible" />
            </template>
            <template #inner-end>
                <f7-link icon-ios="f7:mic" icon-md="material:mic" @click="mic" />
                <f7-link icon-ios="f7:arrow_up_circle_fill" icon-md="material:send" @click="sendMessage" />
            </template>
            <f7-messagebar-attachments>
                <f7-messagebar-attachment v-for="(image, index) in attachments" :key="index" :image="image"
                    @attachment:delete="deleteAttachment(image)"></f7-messagebar-attachment>
            </f7-messagebar-attachments>
            <f7-messagebar-sheet>
                <f7-messagebar-sheet-image v-for="(image, index) in images" :key="index" :image="image"
                    :checked="attachments.indexOf(image) >= 0" @change="handleAttachment"></f7-messagebar-sheet-image>
            </f7-messagebar-sheet>
        </f7-messagebar>

        <f7-messages>
            <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title>
            <f7-message v-for="(message, index) in messagesData" :key="index" :type="message.type" :image="message.image"
                :name="people.find(person => person.userId === message.userId).name" :avatar="message.avatar"
                :first="isFirstMessage(message, index)" :last="isLastMessage(message, index)"
                :tail="isTailMessage(message, index)">
                <template v-if="message.text" #text>
                    <!-- eslint-disable-next-line -->
                    <span v-html="message.text"></span>
                </template>
            </f7-message>
            <f7-message v-if="typingMessage" type="received" :typing="true" :first="true" :last="true" :tail="true"
                :header="`${typingMessage.name} is typing`" :avatar="typingMessage.avatar"></f7-message>
        </f7-messages>
    </f7-page>
</template>
<script>
import { onMounted } from 'vue';
import {
    useStore,
    f7Navbar,
    f7Page,
    f7Messages,
    f7MessagesTitle,
    f7Message,
    f7Messagebar,
    f7Link,
    f7MessagebarAttachments,
    f7MessagebarAttachment,
    f7MessagebarSheet,
    f7MessagebarSheetImage,
    f7ready,
    f7,
} from 'framework7-vue';
import $ from 'dom7';

import store from '../js/store.js'

export default {
    props: {
        f7route: Object,
        f7router: Object,
    },
    components: {
        f7Navbar,
        f7Page,
        f7Messages,
        f7MessagesTitle,
        f7Message,
        f7Messagebar,
        f7MessagebarAttachments,
        f7MessagebarAttachment,
        f7MessagebarSheet,
        f7MessagebarSheetImage,
        f7Link,
    },
    data() {
        return {
            conversationData: store.getters.conversations.value.filter((conversation) => conversation.id === this.f7route.params.conversationId)[0],
            attachments: [],
            sheetVisible: false,
            typingMessage: null,
            messageText: '',
            messagesData: store.getters.conversations.value.filter((conversation) => conversation.id === this.f7route.params.conversationId)[0].messages,
            images: [
                'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
                'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
                'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
                'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
                'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
                'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
            ],
            people: store.getters.conversations.value.filter((conversation) => conversation.id === this.f7route.params.conversationId)[0].people,
            answers: [
                'Yes!',
                'No',
                'Hm...',
                'I am not sure',
                'And what about you?',
                'May be ;)',
                'Lorem ipsum dolor sit amet, consectetur',
                'What?',
                'Are you sure?',
                'Of course',
                'Need to think about it',
                'Amazing!!!',
            ],
            responseInProgress: false,
        };
    },
    computed: {
        attachmentsVisible() {
            const self = this;
            return self.attachments.length > 0;
        },
        placeholder() {
            const self = this;
            return self.attachments.length > 0 ? 'Add comment or Send' : 'Message';
        },
    },
    mounted() {
        const self = this;
        f7ready(() => {
            self.messagebar = f7.messagebar.get(self.$refs.messagebar.$el);
        });

        store.dispatch('getConversation', this.f7route.params.conversationId);
        store.dispatch('getConversations');

        console.log(store.getters.conversations.value.filter((conversation) => conversation.id === this.f7route.params.conversationId));
    },
    methods: {
        isFirstMessage(message, index) {
            const self = this;
            const previousMessage = self.messagesData[index - 1];
            if (message.isTitle) return false;
            if (
                !previousMessage ||
                previousMessage.type !== message.type ||
                previousMessage.userId !== message.userId
            )
                return true;
            return false;
        },
        isLastMessage(message, index) {
            const self = this;
            const nextMessage = self.messagesData[index + 1];
            if (message.isTitle) return false;
            if (!nextMessage || nextMessage.type !== message.type || nextMessage.userId !== message.userId)
                return true;
            return false;
        },
        isTailMessage(message, index) {
            const self = this;
            const nextMessage = self.messagesData[index + 1];
            if (message.isTitle) return false;
            if (!nextMessage || nextMessage.type !== message.type || nextMessage.userId !== message.userId)
                return true;
            return false;
        },
        deleteAttachment(image) {
            const self = this;
            const index = self.attachments.indexOf(image);
            self.attachments.splice(index, 1)[0]; // eslint-disable-line
        },
        handleAttachment(e) {
            const self = this;
            const index = $(e.target).parents('label.checkbox').index();
            const image = self.images[index];
            if (e.target.checked) {
                // Add to attachments
                self.attachments.unshift(image);
            } else {
                // Remove from attachments
                self.attachments.splice(self.attachments.indexOf(image), 1);
            }
        },
        sendMessage() {
            const self = this;
            const text = self.messageText.replace(/\n/g, '<br>').trim();
            const messagesToSend = [];
            self.attachments.forEach((attachment) => {
                messagesToSend.push({
                    image: attachment,
                });
            });
            if (text.length) {
                messagesToSend.push({
                    text,
                });
            }
            if (messagesToSend.length === 0) {
                return;
            }

            // Reset attachments
            self.attachments = [];
            // Hide sheet
            self.sheetVisible = false;
            // Clear area
            self.messageText = '';
            // Focus area

            if (text.length) self.messagebar.focus();
            // Send message
            self.messagesData.push(...messagesToSend);

            // Update typing indicator
            const personIndex = self.people.findIndex((person) => person.name === self.typingMessage.name);
            if (personIndex !== -1) {
                self.messagesData.splice(personIndex, 0, {
                    text: `${self.typingMessage.name} is typing`,
                    type: 'typing',
                    avatar: self.typingMessage.avatar,
                });
            }

            // Mock response

            if (self.responseInProgress) return;
            self.responseInProgress = true;
            setTimeout(() => {
                const answer = self.answers[Math.floor(Math.random() * self.answers.length)];
                const person = self.people[Math.floor(Math.random() * self.people.length)];
                self.typingMessage = {
                    name: person.name,
                    avatar: person.avatar,
                };
                setTimeout(() => {
                    self.messagesData.push({
                        text: answer,
                        type: 'received',
                        name: person.name,
                        avatar: person.avatar,
                    });
                    self.typingMessage = null;
                    self.responseInProgress = false;
                }, 4000);
            }, 1000);
        },
    },
};
</script>