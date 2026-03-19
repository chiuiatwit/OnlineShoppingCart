import React from 'react';
import './About.css';

const TEAM = [
  { name: 'Ivan Chiu', role: 'Backend / Application Logic', photo: '/images/Ivan.jpg' },
  { name: 'Tony You', role: 'Frontend / UI Design', photo: '/images/tony.PNG' },
  { name: 'Isabella George', role: 'User Experience, Testing & Integration', photo: '/images/Isabella.JPG' },
  { name: 'Kledja Caushi', role: 'Auth, Search & UI, Project Setup', photo: '/images/KledjaCaushi.JPG' },
];

export default function About() {
  return (
    <div className="about">
      <section className="about__overview">
        <h1>Project Overview</h1>
        <p>
          Browse our site and see up-to-the-minute pricing instantly. You can
          save items to a temporary list as you shop, and when you sign in, your
          selections automatically sync to your account. This ensures a seamless
          experience, letting you pick up right where you left off on any device.
        </p>
      </section>

      <section className="about__team">
        <h2>The Team</h2>
        <div className="about__team-grid">
          {TEAM.map((member) => (
            <article key={member.name} className="about__member">
              <img
                src={member.photo}
                alt={member.name}
                className="about__photo"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
