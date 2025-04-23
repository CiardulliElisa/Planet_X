'use client'
import React, { useState, useEffect } from 'react';
import './styles.css';
import getClientId from '../lib/auth';

export default function Research() {

  const [player, setPlayer] = useState({});
  const [researchA, setResearchA] = useState("HIDDEN");
  const [researchB, setResearchB] = useState("HIDDEN");
  const [researchC, setResearchC] = useState("HIDDEN");
  const [researchD, setResearchD] = useState("HIDDEN");
  const [researchE, setResearchE] = useState("HIDDEN");
  const [researchF, setResearchF] = useState("HIDDEN");
  const [researchX1, setResearchX1] = useState("HIDDEN");



  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParts = window.location.pathname.split('/');
      const roomFromUrl = urlParts[urlParts.indexOf('game') + 1];

      // Get player
      fetch(`/api/game/getplayer?id=${getClientId()}&room=${roomFromUrl}`)
        .then(response => response.json())
        .then(data => setPlayer((data)))
        .catch(error => console.error(error));
    }
  }, []);

  useEffect(() => {
    if (player.researches) {
      if (player.researches.a) {
        setResearchA(player.researches.a);
      }
      if (player.researches.b) {
        setResearchB(player.researches.b);
      }
      if (player.researches.c) {
        setResearchC(player.researches.c);
      }
      if (player.researches.d) {
        setResearchD(player.researches.d);
      }
      if (player.researches.e) {
        setResearchE(player.researches.e);
      }
      if (player.researches.f) {
        setResearchF(player.researches.f);
      }
      if (player.researches.x1) {
        setResearchX1(player.researches.x1);
      }
    }
  }, [player]);

  return (
    <div style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} className="container-fluid text-center">

      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-11 mx-auto">
          <table className="table big-table table-dark table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th colSpan="3" scope="col" className="text-center">RESEARCHES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="letter">A</th>
                <td className="page-text">{researchA}</td>
              </tr>
              <tr>
                <th scope="row" className="letter">B</th>
                <td className="page-text">{researchB}</td>
              </tr>
              <tr>
                <th scope="row" className="letter">C</th>
                <td className="page-text">{researchC}</td>
              </tr>
              <tr>
                <th scope="row" className="letter">D</th>
                <td className="page-text">{researchD}</td>
              </tr>
              <tr>
                <th scope="row" className="letter">E</th>
                <td className="page-text">{researchE}</td>
              </tr>
              <tr>
                <th scope="row" className="letter">F</th>
                <td className="page-text">{researchF}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}