import HelpTab, {Section} from "@/components/help-tab.jsx";

const SearchRuntimeHelpTab = ({ onDismiss }) => {
  return (
    <HelpTab
      title="Runtime Search"
      subtitle="The Search Runtime section lets you explore and search live JavaScript objects directly in the browser’s runtime environment."
      onDismiss={onDismiss}
    >
      <>
        <Section>
          <ul className="text-left mt-5 mb-10 list-disc! ml-4">
            <li>Always returns the full access path to each matched object (e.g., window.app.store.users[3].profile)</li>
            <li>These concrete paths are not always available from a heap snapshot and can be copied into Scripts to read or modify the same objects directly.</li>
          </ul>
        </Section>
        <Section>
          Use Search Runtime when you need live state introspection and a guaranteed path you can reuse in your automation.
        </Section>
      </>
    </HelpTab>
  )
};

export default SearchRuntimeHelpTab;