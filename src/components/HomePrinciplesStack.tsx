const PRINCIPLES = [
  ['Personalisation at the Core', 'Context First'],
  ['Connected to Real Work', 'Native Stack'],
  ['People Retain Judgement', 'Human Oversight'],
  ['Practical Before Complex', 'Focused Pilots'],
  ['One Win, Then Multiply', 'Proven Scale'],
  ['Enduring Ecosystem IP', 'Venture Depth'],
  ['Continuous Compounding', 'Discover · Pilot · Scale'],
];

export function HomePrinciplesStack() {
  return <section id="principles" className="section-shell charter-editorial" aria-labelledby="principles-heading">
    <div className="charter-intro">
      <h2 id="principles-heading">Built around work.<br /><span className="font-editorial">Grounded in people.</span></h2>
      <p>Personalised AI, human judgement, and systems built to compound.</p>
      <p className="charter-signature font-editorial">BrandMint Charter</p>
    </div>
    <div className="charter-body">
      <ul>{PRINCIPLES.map(([title, tag]) => <li key={title}><h3>{title}</h3><span>{tag}</span></li>)}</ul>
      <p className="charter-closing">Every pilot ships with clear ROI &amp; human control.</p>
    </div>
  </section>;
}
