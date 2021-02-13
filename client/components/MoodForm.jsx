import axios from 'axios';
import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { getSongs, getFeatures, getRecommended } from '../controllers';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


const MoodForm = ({ user, setUser, getData }) => {
  const [mood, setMood ] = useState(50);
  const [energy, setEnergy] = useState(50);

  const saveMood = () => {
    axios.put(`http://localhost:3000/api/user/${user._id}`, {
      mood: Number(mood),
      energy: Number(energy),
      date: new Date()
    })
      .then(() => {
        getData(user._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const submitMood = async () => {
    const { accessToken } = user;
    const energyDec = Number(energy) / 100;
    const moodDec = (Number(mood) + Number(energy)) / 250;

    console.log(energyDec, moodDec)

    const { data } = await getSongs(accessToken);
    const tracks = data.items.map((v) => v.id).join('%2C');

    const features = await getFeatures(tracks, accessToken);
    console.log(features)
    const filtered = features.data.audio_features
      .filter((t) => t.energy >= (energyDec - 0.15) && t.energy <= (energyDec + 0.15))
      .filter((t) => t.danceability >= (moodDec - 0.15) && t.danceability <= (moodDec + 0.15))
      .map((v) => v.id).join('%2c');

    const playlistTracks = await getRecommended(filtered, accessToken, energyDec - 0.15, moodDec - 0.15, energyDec + 0.15, moodDec + 0.15);
    console.log(playlistTracks.data);
  }

  return (
    <div id='mood-slider'>
      <div id='mood-title' >What's your mood?</div>
      <div>Mood: {mood}% {'  '}
        <RangeSlider variant='success' value={mood} step={10} onChange={(e) => setMood(e.target.value)} />
      </div>
      <div>Energy: {energy}% {'  '}
        <RangeSlider variant='success' value={energy} step={10} onChange={(e) => setEnergy(e.target.value)} />
      </div>
      <button id='slider-btn' onClick={submitMood}>Find playlists!</button>
    </div>
  );

};

export default MoodForm;