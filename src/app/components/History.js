'use client'

import React, { useState, useEffect } from 'react';
import './styles.css'
import getClientId from '../lib/auth';

export default function History() {

  const [player, setPlayer] = useState({});
  const [otherPlayers, setOtherPlayers] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParts = window.location.pathname.split('/');
      const roomFromUrl = urlParts[urlParts.indexOf('game') + 1];

      // Get player
      fetch(`/api/game/getplayer?id=${getClientId()}&room=${roomFromUrl}`)
        .then(response => response.json())
        .then(data => {
          setPlayer(data);
        })
        .catch(error => console.error(error));

      // Get the other players
      fetch(`/api/game/getOtherPlayers?id=${getClientId()}&room=${roomFromUrl}`)
        .then(response => response.json())
        .then(data => {
          setOtherPlayers(data);
        })
        .catch(error => console.error(error));
    }
  }, []);

  // Ensure actions arrays exist and calculate max length
  const playerActionsLength = player.actions ? player.actions.length : 0;
  const otherPlayersActionsLengths = Object.values(otherPlayers)
    .map(p => (p.actions ? p.actions.length : 0));

  const maxActionsLength = Math.max(playerActionsLength, ...otherPlayersActionsLengths);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <div className="table-responsive scrollable">
      <table className="small-table table table-bordered table-hover table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" colSpan={2}>You</th>
            {Object.keys(otherPlayers).map((playerKey, index) => (
              <th key={index} scope="col">{capitalizeFirstLetter(playerKey)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {maxActionsLength === 0 ? (
            <tr>
              <td colSpan={5} className="text-center small-page-text">
                No actions available
              </td>
            </tr>
          ) : (
            Array.from({ length: maxActionsLength }).map((_, index) => (
              <tr key={index}>
                <th className='small-page-text' scope="row">{index + 1}</th>
                <td className='small-page-text'>{index < playerActionsLength ? player.actions[index] : ''}</td>
                <td className='small-page-text'>{index < playerActionsLength ? player.action_results[index] : ''}</td>
                {Object.keys(otherPlayers).map((playerKey, playerIndex) => (
                  <td className='small-page-text' key={playerIndex}>
                    {index < (otherPlayers[playerKey]?.actions?.length || 0) ? otherPlayers[playerKey].actions[index] : ''}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}