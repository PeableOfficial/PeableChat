<template>
  <f7-page name="home" tabs hide-toolbar-on-scroll ptr>
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Chat by Peable</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:search" icon-md="material:search" @click="toggleSearch"></f7-link>
        <f7-link icon-ios="f7:menu" icon-md="material:more_vert" href="/settings/"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large>Chat by Peable</f7-nav-title-large>
    </f7-navbar>


    <div class="searchbar-backdrop"></div>
    <form class="searchbar">
      <div class="searchbar-inner">
        <div class="searchbar-input-wrap">
          <input type="search" placeholder="Search" v-model="searchQuery" />
          <i class="searchbar-icon"></i>
          <span class="input-clear-button"></span>
        </div>
        <span class="searchbar-disable-button">Cancel</span>
      </div>
    </form>


    <f7-tabs>
      <f7-tab id="tab-1" tab-active>
        <f7-block>
          <f7-block-title>Conversations</f7-block-title>
          <f7-block v-if="!conversations.length > 0" class="text-align-center">
            <f7-button v-if="!conversationsLoading" fill round href="/contacts/">New Conversation</f7-button>
            <f7-preloader v-else />
          </f7-block>
          <f7-list media-list dividers-ios strong-ios outline-ios>
            <f7-list-item v-for="(item, index) in  conversations " :key="index" :link="`/c/${item.id}/`"
              :title="item.title" :badge="`${item.id}`" badge-color="green" :after="item.lastactivity"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.">
              <template #media>
                <img style="border-radius: 3em; object-fit: cover;" :src="`https:${item.image}`" width="44" height="44" />
              </template>
            </f7-list-item>
          </f7-list>
        </f7-block>
        <f7-block strong outline>
          <p>
            Tap and hold on a chat for more options
          </p>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2">
        <f7-block>
          <f7-block-title>Status</f7-block-title>
          <f7-block v-if="!conversations.length > 0" class="text-align-center">
            <f7-button v-if="!conversationsLoading" fill round href="/contacts/">New Conversation</f7-button>
            <f7-preloader v-else />
          </f7-block>
          <f7-list media-list dividers-ios strong-ios outline-ios>
            <f7-list-item v-for="(item, index) in  conversations " :key="index" :link="`/c/${item.id}/`"
              :title="item.title" :badge="5" badge-color="green" :after="item.lastactivity"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.">
              <template #media>
                <img style="border-radius: 3em; object-fit: cover;" :src="`https:${item.image}`" width="44" height="44" />
              </template>
            </f7-list-item>
          </f7-list>
        </f7-block>
        <f7-block strong outline>
          <p>
            Tap and hold on a chat for more options
          </p>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-3">
        <f7-block>
          <f7-block-title>Calls</f7-block-title>
          <f7-block v-if="!conversations.length > 0" class="text-align-center">
            <f7-button v-if="!conversationsLoading" fill round href="/contacts/">New Conversation</f7-button>
            <f7-preloader v-else />
          </f7-block>
          <f7-list media-list dividers-ios strong-ios outline-ios>
            <f7-list-item v-for="(item, index) in  conversations " :key="index" :link="`/c/${item.id}/`"
              :title="item.title" badge="5" badge-color="green" :after="item.lastactivity"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.">
              <template #media>
                <img style="border-radius: 3em; object-fit: cover;" :src="`https:${item.image}`" width="44" height="44" />
              </template>
            </f7-list-item>
          </f7-list>
        </f7-block>
        <f7-block strong outline>
          <p>
            Tap and hold on a chat for more options
          </p>
        </f7-block>
      </f7-tab>
    </f7-tabs>

    <f7-toolbar position="bottom" tabbar icons>
      <f7-link tab-link="#tab-1" tab-link-active text="Chats" icon-ios="f7:envelope_fill" icon-md="material:chat" />
      <f7-link tab-link="#tab-2" text="Status" icon-ios="f7:calendar_fill" icon-md="material:motion_photos_on" />
      <f7-link tab-link="#tab-3" text="Calls" icon-ios="f7:cloud_upload_fill" icon-md="material:calls" />
    </f7-toolbar>

    <f7-fab position="right-bottom" text="Create" href="/contacts/">
      <f7-icon ios="f7:plus" md="material:add"></f7-icon>
    </f7-fab>
  </f7-page>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore, f7Navbar, f7Page, f7BlockTitle, f7List, f7ListItem } from 'framework7-vue';

import store from '../js/store.js'

export default {
  setup() {
    // retrieve "conversations" getter handler value. Initially empty array
    const conversations = useStore('conversations');
    const conversationsLoading = true;
    const searchQuery = ref('');
    const searchLoading = ref(false); // Add this line

    onMounted(() => {
      store.dispatch('getConversations');
    });

    const filteredConversations = computed(() => {
      searchLoading.value = true; // Set loading to true when search starts
      const filtered = conversations.value.filter(conversation => {
        return conversation.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
      searchLoading.value = false; // Set loading to false when search ends
      return filtered;
    });

    return {
      conversations: filteredConversations,
      conversationsLoading,
      searchQuery,
      searchLoading, // Return this in the setup function
    }
  }
}
</script>