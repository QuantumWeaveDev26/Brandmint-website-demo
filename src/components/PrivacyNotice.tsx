import { AccessibleDialog } from './AccessibleDialog';
export function PrivacyNotice({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return <AccessibleDialog isOpen={isOpen} onClose={onClose} title="Website privacy information">
    <div className="space-y-4 text-sm leading-relaxed text-[#CCC7F2]">
      <p>The enquiry forms prepare a WhatsApp message using the details you enter. You review and send that message in WhatsApp. Preparing a draft does not confirm a message or book a call.</p>
      <p>WhatsApp and Calendly are external services. Their privacy terms apply when you open them. Only include details you want to share with BrandMint AI to discuss your enquiry; avoid confidential documents or sensitive personal information.</p>
      <p>The on-page help uses a local set of website answers. It does not connect to your business systems. Your form entries and help conversation stay in this page until you choose an external handoff or leave the page.</p>
      <p>Cookie settings store your preferences in this browser. Videos are served as website assets. You can pause videos and demos using the playback button in the navigation bar.</p>
      <p>For questions about an enquiry or to request removal of details you have shared, contact <a className="underline" href="mailto:connect@brandmintai.io">connect@brandmintai.io</a>.</p>
    </div>
  </AccessibleDialog>;
}
