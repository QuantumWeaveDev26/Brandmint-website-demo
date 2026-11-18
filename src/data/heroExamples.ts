import { Bot, BookOpen, Database, GraduationCap, MessageCircle, Mic, Search, UserCheck, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ExampleFrame { label: string; message: string; status: string; icon: LucideIcon }
interface ExampleStep { title: string; text: string; icon: LucideIcon }
export interface HeroExample { id: string; label: string; frames: ExampleFrame[]; steps: ExampleStep[]; href: string; action: string }

export const HERO_EXAMPLES: HeroExample[] = [
  {
    id: 'whatsapp', label: 'WhatsApp & CRM', href: '#simulator', action: 'Explore the conversation demo',
    frames: [
      { label: 'A customer starts a conversation', message: '“Can you help us automate our follow-ups?”', status: 'Enquiry received', icon: MessageCircle },
      { label: 'An assistant prepares a contextual reply', message: '“Which CRM does your team use, and where do your enquiries arrive?”', status: 'Reply prepared', icon: MessageCircle },
      { label: 'The conversation becomes a useful record', message: 'WhatsApp enquiry → Follow-up automation → CRM record', status: 'CRM record updated', icon: Database },
      { label: 'A person gets the context to take over', message: 'Enquiry captured. Conversation attached. Ready for your team to review.', status: 'Human handoff ready', icon: UserCheck },
    ],
    steps: [
      { title: 'Reply with context', text: 'Use your approved business information.', icon: MessageCircle },
      { title: 'Keep the CRM in sync', text: 'Bring the enquiry and conversation together.', icon: Database },
      { title: 'Hand over to your team', text: 'Give the right person the context to take over.', icon: UserCheck },
    ],
  },
  {
    id: 'agents', label: 'AI agents', href: '/solutions', action: 'Explore AI agents & assistants',
    frames: [
      { label: 'A team member sets the task', message: '“Research this enquiry and prepare a first draft for our team.”', status: 'Task received', icon: Bot },
      { label: 'The agent gathers relevant context', message: 'Find the relevant details in approved knowledge and connected tools.', status: 'Context gathered', icon: Search },
      { label: 'A useful draft takes shape', message: 'Research → Draft → Review queue. Your team decides what happens next.', status: 'Draft prepared', icon: Workflow },
      { label: 'A person reviews the next action', message: 'Check the work, approve the response, or send it back for refinement.', status: 'Ready for human review', icon: UserCheck },
    ],
    steps: [
      { title: 'Give the agent a role', text: 'A focused task with clear boundaries.', icon: Bot },
      { title: 'Connect useful context', text: 'Knowledge and tools that support the task.', icon: Database },
      { title: 'Keep people in control', text: 'Review points before important actions.', icon: UserCheck },
    ],
  },
  {
    id: 'voice', label: 'Voice assistants', href: '/solutions', action: 'Explore voice assistants',
    frames: [
      { label: 'A caller asks for help', message: '“I’d like to understand your services and speak to the right person.”', status: 'Conversation starts', icon: Mic },
      { label: 'The assistant listens for intent', message: 'Understand the question and ask for the context needed to help.', status: 'Intent understood', icon: MessageCircle },
      { label: 'Approved knowledge guides the answer', message: 'A spoken question becomes a relevant, conversational response.', status: 'Response prepared', icon: Database },
      { label: 'Your team takes over when needed', message: 'Route the conversation with a useful summary for a human colleague.', status: 'Handoff prepared', icon: UserCheck },
    ],
    steps: [
      { title: 'Listen naturally', text: 'Voice assistants for business conversations.', icon: Mic },
      { title: 'Respond with context', text: 'Answers grounded in your business knowledge.', icon: Database },
      { title: 'Connect the right person', text: 'A clear path to a human handoff.', icon: UserCheck },
    ],
  },
  {
    id: 'learning', label: 'Learn AI', href: '/academy', action: 'Explore learning opportunities',
    frames: [
      { label: 'Choose a skill to build', message: '“I want to learn how to use AI in my work and build practical projects.”', status: 'Learning goal chosen', icon: GraduationCap },
      { label: 'Learn the foundations', message: 'Explore applied AI, development, marketing, and creative workflows.', status: 'Explore a learning track', icon: BookOpen },
      { label: 'Practice with projects', message: 'Turn an idea into an exercise, a workflow, or something you can demonstrate.', status: 'Put learning into practice', icon: Workflow },
      { label: 'Bring the skill into your work', message: 'Keep learning, build your confidence, and apply the skills to a useful problem.', status: 'Build practical capability', icon: GraduationCap },
    ],
    steps: [
      { title: 'Choose your direction', text: 'Learning opportunities through BrandMint Academy.', icon: GraduationCap },
      { title: 'Learn by doing', text: 'Practice tools, ideas, and practical projects.', icon: BookOpen },
      { title: 'Grow your skills', text: 'Apply what you learn to real work.', icon: Workflow },
    ],
  },
];
