import React from 'react'

var songAdder = (id, addSong) => (
  e => {
    e.preventDefault()
    var song = {
      title: e.target.title.value,
      href: e.target.href.value
    }
    addSong(id, song)
  }
)

const Band = ({ id, addSong, songs, loadBand, loaded }) => (
  <div>
    { void(loaded || loadBand(id)) }
    Band Name [{ id }]<br />
    <form onSubmit={ songAdder(id, addSong) }>
      <input name="title" placeholder="title" />
      <input name="href" placeholder="href" />
      <input type="submit" value="Add" />
    </form>
    <ul>{
      songs.map(song => (
        <li><a href={song.href}>{song.title}</a></li>
      ))
    }</ul>
  </div>
)

export default Band
