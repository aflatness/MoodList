import axios from 'axios';
import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { getSongs, getFeatures, getRecommended } from '../controllers';

const MoodForm = ({ user }) => {
  const [mood, setMood ] = useState(50);
  const [energy, setEnergy] = useState(50);

  const saveMood = () => {
    axios.post(`http://localhost:3000/api/user/${user._id}`, {mood, energy, date: new Date()})
      .then(() => {

      })
      .catch(() => {

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
      <div>What is your mood?</div>
      <div>Mood: {mood}% {'  '}
        <RangeSlider onChange={(e) => setMood(e.target.value)} />
      </div>
      <div>Energy: {energy}% {'  '}
        <RangeSlider onChange={(e) => setEnergy(e.target.value)} />
      </div>
      <button onClick={submitMood}>Find playlists!</button>
    </div>
  );

};

export default MoodForm;