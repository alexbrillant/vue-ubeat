import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AlbumContainer from '@/containers/AlbumContainer'
import AlbumItemsContainer from '@/containers/AlbumItemsContainer'
import ArtistContainer from '@/containers/ArtistContainer'
import ArtistsContainer from '@/containers/ArtistsContainer'
import PlaylistForm from '@/components/PlaylistForm'
import User from '@/components/User'
import PlaylistsContainer from '@/containers/PlaylistsContainer'
import PlaylistContainer from '@/containers/PlaylistContainer'
import SignUp from '@/components/SignUp'
import Settings from '@/components/Settings'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import SearchResults from '@/components/SearchResults'
import AlbumsContainer from '@/containers/AlbumsContainer'
import TracksContainer from '@/containers/TracksContainer'
import UsersContainer from '@/containers/UsersContainer'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/artists',
      name: 'Artists',
      component: ArtistsContainer
    }, {
      path: '/artist/:id',
      name: 'Artist',
      component: ArtistContainer
    }, {
      path: '/albums',
      name: 'Albums',
      component: AlbumsContainer
    }, {
      path: '/album/:id',
      name: 'Album',
      component: AlbumContainer,
      props: true
    }, {
      path: '/album/:id/buy',
      name: 'AlbumItems',
      component: AlbumItemsContainer,
      props: true
    }, {
      path: '/playlists',
      name: 'Playlists',
      component: PlaylistsContainer
    }, {
      path: '/playlists/new',
      name: 'NewPlaylist',
      component: PlaylistForm
    }, {
      path: '/playlists/:id',
      name: 'Playlist',
      props: true,
      component: PlaylistContainer
    }, {
      path: '/playlists/:id/edit',
      name: 'EditPlaylist',
      props: true,
      component: PlaylistForm
    }, {
      path: '/tracks',
      name: 'Tracks',
      component: TracksContainer
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }, {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }, {
      path: '/search',
      name: 'SearchResults',
      component: SearchResults
    }, {
      path: '/users',
      name: 'Users',
      component: UsersContainer
    }, {
      path: '/user/:id',
      name: 'User',
      component: User
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresToBeLoggedIn = !['Login', 'SignUp'].includes(to.name)
  if (store.getters.isLoggedIn) {
    return next()
  } else if (requiresToBeLoggedIn) {
    return ensureLoggedIn(next)
  }
  next()
})

const ensureLoggedIn = async (next) => {
  await store.dispatch('user/tryToSetUserWithToken')
  if (store.getters.isLoggedIn) {
    return next()
  }
  return next({ name: 'Login' })
}

export default router
