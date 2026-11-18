import { ArrowUpRight, Plus } from 'lucide-react';

const QUESTIONS = [
  ['Where should we start?', 'Start with one recurring bottleneck: missed enquiries, manual CRM updates, repetitive follow-ups, or time spent preparing reports. We can discuss the workflow and decide whether AI is a useful fit.'],
  ['Can you work with our existing tools?', 'Connecting your existing systems is one of our solution areas. Share your CRM, messaging channels, and knowledge sources so we can assess the integration and access requirements.'],
  ['Will our team stay in control?', 'Human judgement is part of the approach. The pilot discussion covers what AI can handle, what needs approval, and when the system should hand over to a person.'],
  ['What happens on the first call?', 'Bring a workflow, the tools you use, and the problem you want to solve. We’ll discuss a practical starting point and what would need to be tested before a wider rollout.'],
];

export function HomeNextSteps() {
  return <section className="section-shell home-next-steps" aria-labelledby="next-steps-title">
    <div className="section-intro">
      <h2 id="next-steps-title">One useful change.<br /><span className="font-editorial">Then build from there.</span></h2>
      <p>A focused pilot gives your team a way to evaluate the work before expanding it.</p>
    </div>
    <ol className="delivery-steps">
      <li><span>01 / Discover</span><h3>Find the friction.</h3><p>Map one workflow, the people involved, and the tools it touches.</p></li>
      <li><span>02 / Pilot</span><h3>Test in context.</h3><p>Agree on the scope, human review points, and what success should look like.</p></li>
      <li><span>03 / Scale</span><h3>Build on what works.</h3><p>Review the outcome with your team and decide what to connect next.</p></li>
    </ol>
    <div className="home-faq">
      <h3>A few things<br /><span className="font-editorial">you might ask.</span></h3>
      <div>{QUESTIONS.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </div>
    <div className="home-final-call">
      <div><h3>What could your team<br /><span className="font-editorial">stop doing manually?</span></h3><p>Let’s start with that.</p></div>
      <a className="home-primary" href="https://calendly.com/team-brandmint/30min" target="_blank" rel="noopener noreferrer">Book a 30-min call <ArrowUpRight size={18} aria-hidden="true" /></a>
    </div>
  </section>;
}
