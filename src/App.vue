<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="font-bold text-white">Auriman</h1>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[ item.href == currentRouteName ? ' bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current=" item.href == currentRouteName ? 'page' : undefined">{{ item.name }}</router-link>
              <label class="relative block text-gray-500 focus-within:text-gray-800">
                  <span class="sr-only">Search</span>
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                      <SearchIcon class="h-6 w-6" aria-hidden="true" />
                  </span>
                  <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search an application..." type="text" name="search"/>
              </label>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-20">
            <div>
              <MenuButton class="bg-gray-800 flex text-sm rounded-full text-gray-400 hover:text-white">
                <span class="sr-only">User Menu</span>
                <UserIcon class="h-6 w-6" :class="userNavActive ? 'text-white' : ''" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <router-link :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</router-link>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href"><DisclosureButton as="a" :class="[ item.href == currentRouteName ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current=" item.href == currentRouteName ? 'page' : undefined">{{ item.name }}</DisclosureButton></router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <router-view/>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/vue/outline'

const navigation = [
  { name: 'Sweet Home', href: '/'},
  { name: 'About', href: '/about'},
]

const userNavigation = [
  { name: 'Preferences', href: '/preferences'},
  { name: 'Settings', href: '/settings'},
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    UserIcon,
    MenuIcon,
    XIcon,
    SearchIcon,
  },
  setup() {
    return {
      navigation,
      userNavigation,
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.path
    },
    userNavActive() {
      let exists = false
      for (let item in userNavigation){
        if (userNavigation[item].href.includes(this.currentRouteName)) {
          exists = true
        }
      }
      return exists
    }
  }
}
</script>