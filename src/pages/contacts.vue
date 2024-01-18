<template>
    <f7-page>
        <f7-navbar title="Contacts" back-link="Back"></f7-navbar>
        <f7-list-index indexes="auto" list-el=".list.contacts-list" :scroll-list="true" :label="true"
            @listindex:select="onIndexSelect"></f7-list-index>
        <f7-list contacts-list strong-ios>
            <f7-list-group v-for="(group, index) in groupedContacts" :key="index">
                <f7-list-item :title="group.letter" group-title />
                <f7-list-item v-for="contact in group.contacts" :title="contact.name" :key="contact.id">
                    <template #media>
                        <img style="border-radius: 3em; object-fit: cover;" :src="contact.image" width="44" height="44" />
                    </template>
                </f7-list-item>
            </f7-list-group>
        </f7-list>
    </f7-page>
</template>

<script>
import { f7Navbar, f7Page, f7List, f7ListGroup, f7ListItem } from 'framework7-vue';

export default {
    components: {
        f7Navbar,
        f7Page,
        f7List,
        f7ListGroup,
        f7ListItem,
    },
    data() {
        return {
            contacts: [
                { id: 1, name: 'Aaron', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 2, name: 'Abbie', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 3, name: 'Adam', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 4, name: 'Alex', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 5, name: 'Alice', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 6, name: 'Bob', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 7, name: 'Charlie', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 8, name: 'David', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 9, name: 'Eve', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
                { id: 10, name: 'Frank', image: 'https://cloud.peable.co/kbKQmmuArPyWn0ECnN16XsrxBQSO1qzX4SN6YdMhHzAOxq4XKGC8TVSmcLKyNUEAOwXeV40AurmFYZTcoYpN1Naahix' },
            ]
        }
    },
    computed: {
        groupedContacts() {
            const groups = this.contacts.reduce((groups, contact) => {
                const letter = contact.name.charAt(0).toUpperCase();
                if (!groups[letter]) {
                    groups[letter] = [];
                }
                groups[letter].push(contact);
                return groups;
            }, {});

            return Object.keys(groups).map(letter => ({
                letter,
                contacts: groups[letter]
            })).sort((a, b) => a.letter.localeCompare(b.letter));
        }
    }
};
</script>